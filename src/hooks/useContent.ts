import { useEffect, useState } from 'react';
import { Course, ProjectReview } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { PROJECTS_DATA } from '../data/projectsData';
import { fetchCourses, fetchProjects, isWordPressEnabled } from '../lib/wordpress';

export interface ContentState<T> {
  items: T[];
  /** true khi đang tải bài từ WordPress */
  loading: boolean;
  /** Thông báo lỗi nếu gọi WP thất bại (site vẫn chạy bằng dữ liệu tĩnh) */
  error: string | null;
  /** Nguồn dữ liệu đang hiển thị */
  source: 'wordpress' | 'static';
}

/**
 * Tải nội dung từ WordPress nếu đã cấu hình VITE_WP_API_URL.
 * Nếu chưa cấu hình, hoặc WP lỗi/không truy cập được, tự động dùng dữ liệu
 * tĩnh trong src/data/ để trang không bao giờ bị trắng.
 */
function useRemoteContent<T>(
  fallback: T[],
  loader: (signal: AbortSignal) => Promise<T[]>
): ContentState<T> {
  const [state, setState] = useState<ContentState<T>>({
    items: fallback,
    loading: isWordPressEnabled(),
    error: null,
    source: 'static',
  });

  useEffect(() => {
    if (!isWordPressEnabled()) return;

    const controller = new AbortController();

    loader(controller.signal)
      .then((items) => {
        if (controller.signal.aborted) return;
        // WP trả về rỗng (chưa đăng bài nào) thì vẫn giữ dữ liệu mẫu
        if (items.length === 0) {
          setState({ items: fallback, loading: false, error: null, source: 'static' });
          return;
        }
        setState({ items, loading: false, error: null, source: 'wordpress' });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const message = err instanceof Error ? err.message : 'Không kết nối được WordPress';
        console.warn('[WordPress] Dùng dữ liệu tĩnh do lỗi:', message);
        setState({ items: fallback, loading: false, error: message, source: 'static' });
      });

    return () => controller.abort();
    // fallback & loader là hằng ở cấp module nên chỉ chạy 1 lần khi mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

export const useCourses = (): ContentState<Course> =>
  useRemoteContent<Course>(COURSES_DATA, fetchCourses);

export const useProjects = (): ContentState<ProjectReview> =>
  useRemoteContent<ProjectReview>(PROJECTS_DATA, fetchProjects);
