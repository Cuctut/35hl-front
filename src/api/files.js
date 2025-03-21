import request from '../utils/axios'

export function listFiles(fileType, chapterId) {
  return request.get(`/files/list/${fileType}/${chapterId}`);
}

export function downloadFile(fileId) {
  request({
    url: `/files/download/${fileId}`,
    method: 'GET',
    responseType: 'blob', // 确保接收 Blob 数据
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    const contentDisposition = response.headers['content-disposition'];
    const fileName = contentDisposition
      ? decodeURIComponent(contentDisposition.split('filename=')[1].replace(/"/g, ''))
      : 'downloaded_file';

    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }).catch((error) => {
    console.error('File download failed:', error);
    throw error;
  });
}

export function deleteFile(fileId) {
  return request.delete(`/files/delete/${fileId}`);
}

export function getFilePreviewURL(fileId) {
  return request.get(`/files/preview/${fileId}`);
}

export function getRecentFiles(limit) {
  return request.get(`/files/recent/${limit}`);
}