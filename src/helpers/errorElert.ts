import Swal from 'sweetalert2';

export const alertError = (message: string): void => {
    Swal.fire({
        title: 'Đã xảy ra lỗi',
        text: message,
        icon: 'error',
        confirmButtonText: 'Đồng ý',
        confirmButtonColor: '#215493',
    });
};