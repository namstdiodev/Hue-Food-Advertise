export const getFilePreview = (selectedFile: File) => {
    if (!selectedFile) return;
  
    const objectUrl = URL.createObjectURL(selectedFile);
    return objectUrl;
  }