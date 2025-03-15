import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { assets } from '@/assets/assets';
import config from '@/configs';

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const url = 'http://localhost:4000';

    useEffect(() => {
        document.title = 'Đăng ký - Spotify';
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên người dùng'),
            email: Yup.string()
                .email('Email này không hợp lệ. Hãy đảm bảo rằng email được nhập dưới dạng example@email.com.')
                .required('Vui lòng nhập email'),
            password: Yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự').required('Vui lòng nhập mật khẩu'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${url}/api/v1/client/user/signup`, values);
                if (response.data.success) {
                    toast.success('Đăng ký thành công');
                    setUser(true);
                    formik.resetForm();
                }
            } catch (error) {
                console.error('Lỗi khi gửi dữ liệu lên server:', error);
            }
        },
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-screen bg-[#121212] items-center overflow-hidden overflow-y-auto">
            <div>
                <header className="flex justify-center pt-8 pb-6">
                    <div>
                        <img className="w-10" src={assets.spotify_logo} alt="" />
                    </div>
                </header>
                <section className="flex justify-center">
                    <div className="w-[324px]">
                        <header>
                            <h1 className="text-white font-bold text-5xl mb-10 text-center">Đăng ký để bắt đầu nghe</h1>
                        </header>
                        <form action="" onSubmit={formik.handleSubmit}>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="name" className="text-white font-bold">
                                        Họ và tên
                                    </label>
                                    <div
                                        className={`flex items-center h-12 border-[1px] border-[#7c7c7c] ${
                                            formik.touched.name && formik.errors.name
                                                ? 'border-red-500 hover:border-red-500'
                                                : 'border-[#7c7c7c]'
                                        }} mt-2 rounded-md hover:border-white`}
                                    >
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="outline-none bg-transparent text-white p-3 w-full"
                                            placeholder="Nguyễn Văn A"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                        />
                                    </div>
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="flex items-center text-red-500 text-[12px] font-semibold mt-1">
                                            <FontAwesomeIcon icon={faCircleInfo} className="text-base mr-2" />
                                            <span>{formik.errors.name}</span>
                                        </div>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-white font-bold">
                                        Địa chỉ email
                                    </label>
                                    <div
                                        className={`flex items-center h-12 border-[1px] border-[#7c7c7c] ${
                                            formik.touched.email && formik.errors.email
                                                ? 'border-red-500 hover:border-red-500'
                                                : 'border-[#7c7c7c]'
                                        }} mt-2 rounded-md hover:border-white`}
                                    >
                                        <input
                                            id="email"
                                            name="email"
                                            type="text"
                                            className="outline-none bg-transparent text-white p-3 w-full"
                                            placeholder="name@domain.com"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                    </div>
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="flex items-center text-red-500 text-[12px] font-semibold mt-1">
                                            <FontAwesomeIcon icon={faCircleInfo} className="text-base mr-2" />
                                            <span>{formik.errors.email}</span>
                                        </div>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor="password" className="text-white font-bold">
                                        Mật khẩu
                                    </label>
                                    <div
                                        className={`flex items-center h-12 mt-2 border-[1px] ${
                                            formik.touched.password && formik.errors.password
                                                ? 'border-red-500 hover:border-red-500'
                                                : 'border-[#7c7c7c]'
                                        } rounded-md hover:border-white`}
                                    >
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            className="outline-none bg-transparent text-white p-3 w-full"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />
                                        <FontAwesomeIcon
                                            className="text-[#b3b3b3] mr-4 hover:scale-105 hover:text-white cursor-pointer"
                                            icon={showPassword ? faEye : faEyeSlash}
                                            onClick={handleTogglePassword}
                                        />
                                    </div>
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-red-500 text-[12px] font-semibold mt-1">
                                            <FontAwesomeIcon icon={faCircleInfo} className="text-base mr-2" />
                                            <span>{formik.errors.password}</span>
                                        </div>
                                    ) : null}
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="text-black font-bold px-4 py-3 bg-[#1ed760] w-full mt-2 rounded-full hover:bg-[#3be477]"
                                    >
                                        Đăng ký
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-8">
                            <div className="flex items-center justify-center text-white mb-4">
                                <div className="h-px w-32 bg-[#7c7c7c]"></div>
                                <span className="mx-3">hoặc</span>
                                <div className="h-px w-32 bg-[#7c7c7c]"></div>
                            </div>
                            <div className="mt-8">
                                <div className="flex items-center h-12 mt-2 border-[1px] border-[#7c7c7c] rounded-full hover:border-white cursor-pointer">
                                    <button className="flex items-center gap-14 px-4">
                                        <svg
                                            width="25"
                                            height="24"
                                            viewBox="0 0 25 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M22.1 12.2272C22.1 11.5182 22.0364 10.8363 21.9182 10.1818H12.5V14.05H17.8818C17.65 15.3 16.9455 16.3591 15.8864 17.0682V19.5772H19.1182C21.0091 17.8363 22.1 15.2727 22.1 12.2272Z"
                                                fill="#4285F4"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12.4998 21.9999C15.1998 21.9999 17.4635 21.1045 19.118 19.5772L15.8862 17.0681C14.9907 17.6681 13.8453 18.0227 12.4998 18.0227C9.89529 18.0227 7.69075 16.2636 6.90439 13.8999H3.56348V16.4908C5.20893 19.759 8.59075 21.9999 12.4998 21.9999Z"
                                                fill="#34A853"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M6.90455 13.9C6.70455 13.3 6.59091 12.6591 6.59091 12C6.59091 11.3409 6.70455 10.7 6.90455 10.1V7.50909H3.56364C2.88636 8.85909 2.5 10.3864 2.5 12C2.5 13.6136 2.88636 15.1409 3.56364 16.4909L6.90455 13.9Z"
                                                fill="#FBBC05"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12.4998 5.97727C13.968 5.97727 15.2862 6.48182 16.3226 7.47273L19.1907 4.60455C17.4589 2.99091 15.1953 2 12.4998 2C8.59075 2 5.20893 4.24091 3.56348 7.50909L6.90439 10.1C7.69075 7.73636 9.89529 5.97727 12.4998 5.97727Z"
                                                fill="#EA4335"
                                            ></path>
                                        </svg>
                                        <span className="text-white font-bold">Đăng ký bằng Google</span>
                                    </button>
                                </div>
                                <div className="flex items-center h-12 mt-2 border-[1px] border-[#7c7c7c] rounded-full hover:border-white cursor-pointer">
                                    <button className="flex items-center gap-12 px-4">
                                        <svg
                                            width="25"
                                            height="24"
                                            viewBox="0 0 25 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="12.5" cy="12" r="10" fill="white"></circle>
                                            <path
                                                d="M22.5 12C22.5 6.477 18.023 2 12.5 2C6.977 2 2.5 6.477 2.5 12C2.5 16.991 6.157 21.128 10.938 21.878V14.891H8.398V12H10.938V9.797C10.938 7.291 12.43 5.907 14.715 5.907C15.808 5.907 16.953 6.102 16.953 6.102V8.562H15.693C14.45 8.562 14.063 9.333 14.063 10.125V12H16.836L16.393 14.89H14.063V21.878C18.843 21.128 22.5 16.991 22.5 12Z"
                                                fill="#1877F2"
                                            ></path>
                                        </svg>
                                        <span className="text-[white] font-bold">Đăng ký bằng Facebook</span>
                                    </button>
                                </div>
                                <div className="flex items-center h-12 mt-2 border-[1px] border-[#7c7c7c] rounded-full hover:border-white cursor-pointer">
                                    <button className="flex items-center gap-16 px-4">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15.195 4.513C15.873 3.69 16.351 2.567 16.351 1.433C16.351 1.278 16.341 1.123 16.318 1C15.206 1.044 13.872 1.734 13.083 2.668C12.449 3.379 11.871 4.513 11.871 5.647C11.871 5.825 11.905 5.991 11.916 6.047C11.982 6.058 12.094 6.08 12.216 6.08C13.206 6.08 14.45 5.413 15.195 4.513ZM15.973 6.313C14.317 6.313 12.961 7.325 12.093 7.325C11.171 7.325 9.97 6.38 8.525 6.38C5.779 6.38 3 8.648 3 12.918C3 15.586 4.023 18.398 5.301 20.211C6.391 21.744 7.347 23 8.725 23C10.081 23 10.682 22.1 12.371 22.1C14.083 22.1 14.472 22.978 15.973 22.978C17.463 22.978 18.453 21.61 19.397 20.265C20.442 18.72 20.887 17.219 20.897 17.142C20.809 17.119 17.963 15.952 17.963 12.695C17.963 9.871 20.198 8.604 20.331 8.504C18.852 6.381 16.596 6.314 15.973 6.314V6.313Z"
                                                fill="white"
                                            ></path>
                                        </svg>
                                        <span className="text-white font-bold">Đăng ký bằng Apple</span>
                                    </button>
                                </div>
                            </div>
                            <div className="h-px w-full mt-8 bg-[#7c7c7c]"></div>
                            <p className="text-center mt-8">
                                <span className="text-[#b3b3b3]">
                                    Bạn đã có tài khoản?{' '}
                                    <Link className="text-white underline" to={config.routes.login}>
                                        Đăng nhập tại đây.
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
                <footer className="p-6 text-center">
                    <span className="text-[12px] text-[#b3b3b3]">
                        <p>
                            This site is protected by reCAPTCHA and the Google <br />
                            <a className="underline" href="">
                                Privacy Policy
                            </a>{' '}
                            and{' '}
                            <a className="underline" href="">
                                Terms of Service
                            </a>{' '}
                            apply.
                        </p>
                    </span>
                </footer>
            </div>
        </div>
    );
}

export default Signup;
