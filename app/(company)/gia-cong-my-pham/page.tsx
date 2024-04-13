import Image from "next/image";
import Image1 from "@/images/documents/giay-chung-nhan-du-dieu-kien-sx.png";
import Image2 from "@/images/van-phong-ich.jpg";
import Company1 from "@/images/company-1.jpg";
import Company6 from "@/images/company-6.jpg";
import Company9 from "@/images/company-9.jpg";
import Company10 from "@/images/company-10.jpg";
import HoiThaoTQ2023 from "@/images/hoi-thao-tq-2023.jpg";
import iso from "@/images/documents/iso-2023-english.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ServicesPage = () => {
  return (
    <section className="bg-muted/40">
      <div className="max-w-7xl mx-auto py-2 sm:pt-[30px] sm:pb-[60px]">
        <div className="sm:mx-5 mx-2 px-3 pt-5 pb-8 shadow rounded bg-background">
          <h1 className="block text-center text-xl sm:text-2xl font-bold sm:mb-6 mb-3 text-blue-400">
            DỊCH VỤ GIA CÔNG MỸ PHẨM TRỌN GÓI
          </h1>
          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Doanh nghiệp của bạn mong muốn kinh doanh, phát triển lĩnh vực mỹ
            phẩm của riêng mình và cần một đơn bị đồng hành để đáp ứng nhu cầu
            từ tư vấn, nghiên cứu, gia công, thiết kế, bao bì và thực hiện các
            quy trình kiểm soát nghiêm ngặt trước khi sản phẩm được công bố ra
            thị trường.
          </p>

          <div className="max-w-[800px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={4 / 3}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="Nhà Máy Sản Xuất Mỹ Phảm I.C.H"
                  src={Company6}
                  sizes="(min-width: 900px) 800px, calc(93.1vw - 19px)"
                  fill
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2">
                Nhà Máy Sản Xuất Mỹ Phảm I.C.H
              </p>
            </div>
          </div>

          <h2 className="text-base sm:text-lg text-red-500 font-bold mb-3 [&:not(:first-child)]:mt-6">
            VÌ SAO NÊN LỰA CHỌN DỊCH VỤ GIA CÔNG MỸ PHẨM TẠI ICH
          </h2>
          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Gia công mỹ phẩm hạn chế phụ thuộc vào nguồn hàng, chính sách và giá
            cả của các thương hiệu mỹ phẩm trong và ngoài nước. Xu hướng gia
            công mỹ phẩm sẽ là lựa chọn ưu tiên hàng đầu để các cá nhân hoặc
            doanh nghiệp gia tăng cơ hội đẩy mạnh doanh số và khẳng định vị thế
            của thương hiệu trên thị trường.
          </p>

          <div className="max-w-[800px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={4 / 3}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="(Chèn hình nhà máy đang sản xuất mỹ phẩm)"
                  src={Company10}
                  sizes="(min-width: 900px) 800px, calc(93.1vw - 19px)"
                  fill
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2">
                (Chèn hình nhà máy đang sản xuất mỹ phẩm)
              </p>
            </div>
          </div>
          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Khi lựa chọn ICH là đơn vị đồng hành gia công mỹ phẩm, doanh nghiệp
            của bạn hoàn toàn yên tâm về kinh nghiệm, kiến thức về chuyên ngành,
            chúng tôi sẽ thực hiện trọn gói quy trình gia công bao gồm:
          </p>
          <h3 className="text-lg text-blue-400 font-bold mb-3 [&:not(:first-child)]:mt-6">
            1. Đội ngũ kỹ sư R&D riêng biệt
          </h3>

          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Với đội ngũ kỹ sư R&D nhiều năm trong nghề, được xem là bộ phận đóng
            vai trò tiên phong trong quy trình sản xuất mỹ phẩm. Chúng tôi liên
            tục nâng cấp chuyên môn đội ngũ Liên thông qua các hội thảo trong và
            ngoài nước.
          </p>

          <div className="max-w-[800px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={3 / 4}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="(Chèn hình nhà máy đang sản xuất mỹ phẩm)"
                  src={HoiThaoTQ2023}
                  sizes="(min-width: 900px) 800px, calc(93.1vw - 19px)"
                  fill
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2">
                (Chèn hình nhà máy đang sản xuất mỹ phẩm)
              </p>
            </div>
          </div>

          <h3 className="text-lg text-blue-400 font-bold mb-3 [&:not(:first-child)]:mt-6">
            2. Quy trình sản xuất nghiêm ngặt và đạt chuẩn
          </h3>

          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Nhà máy sản xuất mỹ phẩm ICH đạt chuẩn ISO 9001:2015 đảm bảo chất
            lượng sản phẩm được sản xuất trong môi trường tốt nhất cả về nguyên
            liệu, khâu sản xuất, bảo quản và xuất hàng.
          </p>

          <div className="max-w-[800px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={3 / 4}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="(Hình ảnh giấy đạt chuẩn ISO)"
                  src={iso}
                  sizes="(min-width: 900px) 800px, calc(93.1vw - 19px)"
                  fill
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2">
                (Hình ảnh giấy đạt chuẩn ISO)
              </p>
            </div>
          </div>

          <h3 className="text-lg text-blue-400 font-bold mb-3 [&:not(:first-child)]:mt-6">
            3. Công nghệ hiện đại, tiên tiến
          </h3>

          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Dây chuyền sản xuất hiện đại, cập nhật công nghệ tiên tiến về máy
            móc trong và ngoài nước nhằm đáp ứng tối đa nhu cầu của khách hàng.
            Liên tục cập nhật và nâng cấp trình độ chuyên môn của đội ngũ nhân
            viên, kỹ sư.
          </p>

          <div className="max-w-[800px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={4 / 3}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="(Hình ảnh nhà máy với máy móc thiết bị hiện đại)"
                  src={Company1}
                  sizes="(min-width: 900px) 800px, calc(93.1vw - 19px)"
                  fill
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2">
                (Hình ảnh nhà máy với máy móc thiết bị hiện đại)
              </p>
            </div>
          </div>

          <h3 className="text-lg text-blue-400 font-bold mb-3 [&:not(:first-child)]:mt-6">
            4. Bắt kịp xu hướng phát triển của thị trường
          </h3>

          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Với phương châm Không ngừng đổi mới - Không ngừng vươn xa, ICH luôn
            cập nhật liên tục xu hướng mới nhất từ dòng sản phẩm, bao bì thiết
            kế, đến nguồn nguyên liệu đa dạng, dồi dào. Hoàn toàn có thể đáp ứng
            nhu cầu khách hàng cho mọi phân khúc sản phẩm khác nhau.
          </p>
          <h3 className="text-lg text-blue-400 font-bold mb-3 [&:not(:first-child)]:mt-6">
            5. Hỗ trợ tư vấn & thiết kế bao bì, chai lọ
          </h3>

          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Bên cạnh việc phát triển các công thức vượt trội thì dịch vụ gia
            công mỹ phẩm trọn gói tại ICH còn hỗ trợ khách hàng về ý tưởng,
            chiến lược, thiết kế bao bì, mẫu chai lọ. Giúp khách hàng giảm thiểu
            tối đa chi phí và thời gian.
          </p>

          <h3 className="text-lg text-blue-400 font-bold mb-3 [&:not(:first-child)]:mt-6">
            6. Các dịch vụ hậu mãi đi kèm khác
          </h3>

          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Ngoài năng lực sản xuất, ICH cũng chú trọng đến những hậu mãi đi kèm
            khác cho khách hàng như:
          </p>

          <ul className="sm:text-base text-sm font-light text-black-100 list-disc	ml-6 space-y-1 mb-3 [&:not(:first-child)]:mt-6">
            <li>Hỗ trợ công bố mỹ phẩm</li>
            <li>Hỗ trợ đăng ký mã vạch, đăng ký bảo hộ thương hiệu</li>
            <li>
              Hỗ trợ tư vấn thiết kế mẫu mã bao bì/chai lọ bắt mắt theo xu hướng
            </li>
            <li>
              Hỗ trợ tư vấn thiết kế logo ấn tượng phù hợp với định vị thương
              hiệu
            </li>
            <li>Hỗ trợ tư vấn marketing, sản phẩm bắt trend</li>
            <li>Hỗ trợ tư vấn kiến thức chuyên sâu về mỹ phẩm gia công</li>
            <li>Hỗ trợ tư vấn KOL/KOC quảng bá sản phẩm</li>
          </ul>
          <h3 className="text-lg text-blue-400 font-bold mb-3 [&:not(:first-child)]:mt-6">
            7. Cam kết bảo mật thông tin
          </h3>

          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Trong bối cảnh thị trường cạnh tranh như hiện nay. Chúng tôi luôn
            thấu hiểu và đặt quyền lợi khách hàng lên hàng đầu. Khách hàng có
            thể hoàn toàn yên tâm với cam kết thực hiện bảo mật thông tin, công
            thức độc quyền của sản phẩm từ.
          </p>

          <p className="text-xl font-light text-black-100 mb-3 mt-32 ">
            <strong className="font-bold">
              CÔNG TY TNHH MTV TM SẢN XUẤT I.C.H
            </strong>
          </p>
          <p className="text-sm font-light text-black-100 mb-3">
            Văn phòng & Nhà máy: 159 Nguyễn Đình Chiễu, Khóm 3, Phường 4, Sóc
            Trăng.
          </p>
          <p className="text-sm font-light text-black-100 mb-3 truncate">
            Hotline: 0707.000.004
          </p>
          <p className="text-sm font-light text-black-100 mb-3 truncate">
            Email: ichcosmetic@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
};
export default ServicesPage;
