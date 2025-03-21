import request from '../utils/axios';

export function getDailyQuestions4User(year, month) {
  return request.get(`/DQ/${year}/${month}`);
}

export function getDailyQuestions4Admin(year, month) {
  return request.get(`/DQ/op/${year}/${month}`);
}

// 上传每日一题文件
export function uploadDailyQuestionFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  return request.post(`/files/upload/dq/0`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

// 提交每日一题
export function submitDailyQuestion(params) {
  return request.post(`/DQ`, params);
}

export function deleteDailyQuestion(id) {
  return request.delete(`/DQ/${id}`);
}
