import React from "react";
import { Logo } from "@/components/logo";
import {
  BookTextIcon,
  CircleIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  User2Icon,
} from "lucide-react";
import { FaTiktok, FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-accent">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between py-5 lg:mx-auto lg:max-w-screen-xl">
        <div className="flex flex-col basis-1/3 py-2 pl-2 gap-2">
          <Logo className="size-[110px] mb-2" />
          <h2 className="font-bold text-lg">
            CÔNG TY TNHH MTV TM SẢN XUẤT I.C.H
          </h2>
          <div className="flex items-center gap-1 text-sm">
            <BookTextIcon className="w-4 h-4 flex flex-shrink-0" />
            <p>Mã số thuế doanh nghiệp: 2200773307</p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <User2Icon className="w-4 h-4 flex flex-shrink-0" />
            <p>Người đại diện: Lê Minh Đức</p>
          </div>
          <div className="flex items-center gap-1 text-sm max-w-sm">
            <MapPinIcon className="w-4 h-4 flex flex-shrink-0" />
            <p>
              Nhà máy sản xuất: Số 159 Nguyễn Đình Chiểu, Khóm 3, Phường 4,
              Thành phố Sóc Trăng, Tỉnh Sóc Trăng
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <PhoneIcon className="w-4 h-4 flex flex-shrink-0" />
            <p>Hotline: 070 700 00 04</p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <MailIcon className="w-4 h-4 flex flex-shrink-0" />
            <p>Email: contact@ich.com</p>
          </div>
        </div>
        <div className="flex flex-wrap basis-2/3 flex-1">
          <div className="basis-1/2 sm:basis-1/4 md:basis-1/2 lg:basis-1/4 py-2 pl-2">
            <p className="uppercase font-bold">Thông Tin</p>
            <div className="h-0.5 w-12 bg-primary my-2" />
            <div className="flex flex-col gap-2">
              <Link href="/ve-ich" className="flex items-center text-sm">
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Giới Thiệu</p>
              </Link>
              <Link
                href="/gia-cong-my-pham"
                className="flex items-center text-sm"
              >
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Gia Công Mỹ Phẩm</p>
              </Link>
              <Link href="/" className="flex items-center text-sm">
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Liên Hệ</p>
              </Link>
              {/* <Link href="/" className="flex items-center text-sm">
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Sứ mệnh tầm nhìn</p>
              </Link>
              <Link href="/" className="flex items-center text-sm">
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Năng lực cốt lõi</p>
              </Link>
              <Link href="/" className="flex items-center text-sm">
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Nghiên cứu mỹ phẩm</p>
              </Link> */}
            </div>
          </div>
          <div className="basis-1/2 sm:basis-1/4 md:basis-1/2 lg:basis-1/4 py-2 pl-2">
            <p className="uppercase font-bold">Gia Công Mỹ Phẩm</p>
            <div className="h-0.5 w-12 bg-primary my-2" />
            <div className="flex flex-col gap-2">
              <Link href="/" className="flex items-center text-sm">
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Gia Công Kem</p>
              </Link>
              <Link href="/" className="flex items-center text-sm">
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Gia Công Nước Hoa</p>
              </Link>
              <Link href="/" className="flex items-center text-sm">
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Gia Công Sửa Rửa Mặt</p>
              </Link>
              <Link href="/" className="flex items-center text-sm">
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Gia Công Serum</p>
              </Link>
              <Link href="/" className="flex items-center text-sm">
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Gia Công Dầu Gội</p>
              </Link>
              <Link href="/" className="flex items-center text-sm">
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Gia Công Mặt Nạ</p>
              </Link>
            </div>
          </div>
          <div className="basis-1/2 sm:basis-1/4 md:basis-1/2 lg:basis-1/4 py-2 pl-2">
            <p className="uppercase font-bold">Dịch Vụ</p>
            <div className="h-0.5 w-12 bg-primary my-2" />
            <div className="flex flex-col gap-2">
              <Link
                href="/cong-bo-my-pham"
                className="flex items-center text-sm"
              >
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Công Bố Mỹ Phẩm</p>
              </Link>

              {/* <Link
                href="/dang-ky-ma-vach"
                className="flex items-center text-sm"
              >
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Đăng Ký Mã Vạch Sản Phẩm</p>
              </Link> */}

              <Link
                href="/bao-ho-thuong-hieu"
                className="flex items-center text-sm"
              >
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Đăng Ký Bảo Hộ Thương Hiệu</p>
              </Link>

              <Link
                href="/thiet-ke-bao-bi"
                className="flex items-center text-sm"
              >
                <CircleIcon className="w-2 h-2 flex flex-shrink-0 mx-1" />
                <p>Thiết Kế Bao Bì Mỹ Phẩm</p>
              </Link>
            </div>
          </div>
          <div className="basis-1/2 sm:basis-1/4 md:basis-1/2 lg:basis-1/4 py-2 pl-2">
            <p className="uppercase font-bold">Theo Dõi I.C.H</p>
            <div className="h-0.5 w-12 bg-primary my-2" />
            <div className="flex items-center gap-3">
              <Link
                target="_blank"
                href="https://www.tiktok.com/@giacongmyphamich"
              >
                <FaTiktok className="w-5 h-5 flex flex-shrink-0" />
              </Link>

              <Link target="_blank" href="https://www.facebook.com/mindvietnam">
                <FaFacebookF className="w-5 h-5 flex flex-shrink-0" />
              </Link>
              <Link
                target="_blank"
                href="https://www.youtube.com/@nhamaygiacongmyphamich"
              >
                <FaYoutube className="w-5 h-5 flex flex-shrink-0" />
              </Link>
              <FaInstagram className="w-5 h-5 flex flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary dark:bg-primary-foreground text-white">
        <div className="flex flex-col sm:flex-row items-center justify-between lg:mx-auto lg:max-w-screen-xl p-2">
          <p className="text-sm order-last md:order-none mt-1 sm:mt-0">
            © 2023 All rights reserved
          </p>
          <ul className="flex items-center gap-2">
            <li>
              <Link href="/chinh-sach-thanh-toan">
                <p className="text-sm">Chính sách thanh toán</p>
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-bao-hanh">
                <p className="text-sm">Chính sách bảo hành</p>
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-bao-mat">
                <p className="text-sm">Chính sách bảo mật</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
