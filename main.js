/**
 * Tính điểm tuyển sinh
 * 
 * * Đầu vào:
 *   - Điểm chuẩn
 *   - Điểm 3 môn thi
 *   - Điểm ưu tiên khu vực
 *   - Điểm ưu tiên đối tượng
 * 
 * * Xử lý:
 *   - Tính tổng điểm 3 môn thi
 *   - Tính tổng điểm ưu tiên (khu vực + đối tượng)
 *   - Tính tổng điểm xét tuyển = Tổng điểm 3 môn thi + Tổng điểm ưu tiên
 *   - So sánh tổng điểm xét tuyển với điểm chuẩn để xác định đậu/rớt
 * 
 * * Đầu ra:
 *   - Tổng điểm xét tuyển
 *   - Kết quả đậu/rớt
 */

const KHUVUC_A = 2.0;
const KHUVUC_B = 1.0;
const KHUVUC_C = 0.5;

const DOI_TUONG_1 = 2.5;
const DOI_TUONG_2 = 1.5;
const DOI_TUONG_3 = 1.0;


function tinhTong3Mon() {
    const mon1 = parseFloat(document.getElementById("diemToan").value);
    const mon2 = parseFloat(document.getElementById("diemLy").value);
    const mon3 = parseFloat(document.getElementById("diemHoa").value);

    if (mon1 === 0 || mon2 === 0 || mon3 === 0) {
        alert("Có 1 môn = 0 => RỚT");
        return -1;
    }
    return mon1 + mon2 + mon3;
}
function tinhDiemUT() {
    const khuVuc = document.getElementById("khuVuc").value;
    const doiTuong = document.getElementById("doiTuong").value;

    let diemKhuVuc = 0;
    let diemDoiTuong = 0;

    switch (khuVuc) {
        case "A":
            diemKhuVuc = KHUVUC_A;
            break;
        case "B":
            diemKhuVuc = KHUVUC_B;
            break;
        case "C":
            diemKhuVuc = KHUVUC_C;
            break;
        default:
            diemKhuVuc = 0;
    }

    switch (doiTuong) {
        case "1":
            diemDoiTuong = DOI_TUONG_1;
            break;
        case "2":
            diemDoiTuong = DOI_TUONG_2;
            break;
        case "3":
            diemDoiTuong = DOI_TUONG_3;
            break;
        default:
            diemDoiTuong = 0;
    }

    return diemKhuVuc + diemDoiTuong;
}
function tinhDiemXetTuyen() {
    const diemChuan = parseFloat(document.getElementById("diemChuan").value);
    const tong3Mon = tinhTong3Mon();
    const diemUT = tinhDiemUT();
    if (tong3Mon === -1) {
        return;
    }
    const tongDiemXetTuyen = tong3Mon + diemUT;

    let ketQua = "";
    if (tongDiemXetTuyen >= diemChuan) {
        ketQua = "Đậu";
    } else {
        ketQua = "Rớt";
    }

    return ketQua;
}

const btnTinhDiem = document.getElementById("btn_tinhDiem");
btnTinhDiem.onclick =
    function hienThiKetQua() {
        const tong3Mon = tinhTong3Mon();
        const ketQuaDiem = tinhDiemXetTuyen();

        const result = document.getElementById("ketQua");
        result.innerHTML = `Tổng điểm 3 môn: ${tong3Mon.toFixed(2)}<br>Kết quả: ${ketQuaDiem}`;

    }

/**
 * TÍNH TIỀN ĐIỆN
 * 
 * * Đầu vào:
 *   - Số điện tiêu thụ (kWh)
 * 
 * * Xử lý:
 *   - Tính tiền điện dựa trên bậc thang giá điện:
 *     + Bậc 1: 0-50 kWh: 500 đồng/kWh
 *     + Bậc 2: 51-100 kWh: 650 đồng/kWh
 *     + Bậc 3: 101-200 kWh: 850 đồng/kWh
 *     + Bậc 4: 201-350 kWh: 1100 đồng/kWh
 *     + Bậc 5: Trên 350 kWh: 1300 đồng/kWh
 * 
 * * Đầu ra:
 *   - Tổng tiền điện phải trả  
 */

const BAC_1 = 500;
const BAC_2 = 650;
const BAC_3 = 850;
const BAC_4 = 1100;
const BAC_5 = 1300;

let soDien = 0;
let tienDien = 0;

function tinhTienDien() {
    soDien = parseFloat(document.getElementById("soDien").value);

    if (soDien <= 50) {
        tienDien = soDien * BAC_1;
    } else if (soDien <= 100) {
        tienDien = (50 * BAC_1) + ((soDien - 50) * BAC_2);
    } else if (soDien <= 200) {
        tienDien = (50 * BAC_1) + (50 * BAC_2) + ((soDien - 100) * BAC_3);
    } else if (soDien <= 350) {
        tienDien = (50 * BAC_1) + (50 * BAC_2) + (100 * BAC_3) + ((soDien - 200) * BAC_4);
    } else {
        tienDien = (50 * BAC_1) + (50 * BAC_2) + (100 * BAC_3) + (150 * BAC_4) + ((soDien - 350) * BAC_5);
    }

    return tienDien;
}
const btnTinhTienDien = document.getElementById("btn_tinhTienDien");
btnTinhTienDien.onclick =
    function hienThiTienDien() {
        tienDien = tinhTienDien();

        const resultTienDien = document.getElementById("ketQuaTienDien");
        resultTienDien.innerHTML = `Tổng tiền điện phải trả: ${tienDien.toLocaleString()} VND`;
    }

/**
 * TÍNH TIỀN THUẾ THU NHẬP CÁ NHÂN
 * 
 * * Đầu vào:
 *   - Thu nhập cá nhân năm
 *   - Số người phụ thuộc
 * 
 * * Xử lý:
 *   - Tính thu nhập chịu thuế = Thu nhập cá nhân năm - 4 triệu - (1.6 triệu x Số người phụ thuộc)
 *   - Tính thuế thu nhập cá nhân dựa trên biểu thuế lũy tiến từng phần:
 *     + Đến 60 triệu: 5%
 *     + Trên 60 triệu đến 120 triệu: 10%
 *     + Trên 120 triệu đến 210 triệu: 15%
 *     + Trên 210 triệu đến 384 triệu: 20%
 *     + Trên 384 triệu đến 624 triệu: 25%
 *     + Trên 624 triệu đến 960 triệu: 30%
 *     + Trên 960 triệu: 35%
 * 
 * * Đầu ra:
 *   - Tiền thuế thu nhập cá nhân phải nộp  
 */

const TAX_60 = 0.05;
const TAX_120 = 0.10;
const TAX_210 = 0.15;
const TAX_384 = 0.20;
const TAX_624 = 0.25;
const TAX_960 = 0.30;
const TAX_ABOVE_960 = 0.35;

function tinhThueTNCN() {
    const thuNhapNam = parseFloat(document.getElementById("tongThuNhap").value * 1);
    const soNguoiPhuThuoc = parseInt(document.getElementById("soNguoiPhuThuoc").value * 1);

    const thuNhapChiuThue = thuNhapNam - 4 - (soNguoiPhuThuoc * 1, 6);

    let thueTNCN = 0;

    if (thuNhapChiuThue <= 60) {
        thueTNCN = thuNhapChiuThue * TAX_60;
    } else if (thuNhapChiuThue <= 120) {
        thueTNCN = (60 * TAX_60) + ((thuNhapChiuThue - 60) * TAX_120);
    } else if (thuNhapChiuThue <= 210) {
        thueTNCN = (60 * TAX_60) + (60 * TAX_120) + ((thuNhapChiuThue - 120) * TAX_210);
    } else if (thuNhapChiuThue <= 384) {
        thueTNCN = (60 * TAX_60) + (60 * TAX_120) + (90 * TAX_210) + ((thuNhapChiuThue - 210) * TAX_384);
    } else if (thuNhapChiuThue <= 624) {
        thueTNCN = (60 * TAX_60) + (60 * TAX_120) + (90 * TAX_210) + (174 * TAX_384) + ((thuNhapChiuThue - 384) * TAX_624);
    } else if (thuNhapChiuThue <= 960) {
        thueTNCN = (60 * TAX_60) + (60 * TAX_120) + (90 * TAX_210) + (174 * TAX_384) + (240 * TAX_624) + ((thuNhapChiuThue - 624) * TAX_960);
    } else {
        thueTNCN = (60 * TAX_60) + (60 * TAX_120) + (90 * TAX_210) + (174 * TAX_384) + (240 * TAX_624) + (336 * TAX_960) + ((thuNhapChiuThue - 960) * TAX_ABOVE_960);
    }

    return thueTNCN;
}

const btnTinhThueTNCN = document.getElementById("btn_tinhThue");
btnTinhThueTNCN.onclick =
    function hienThiThueTNCN() {
        const thueTNCN = tinhThueTNCN();

        const resultThueTNCN = document.getElementById("ketQuaThue");
        resultThueTNCN.innerHTML = `Tiền thuế thu nhập cá nhân phải nộp: ${thueTNCN.toLocaleString()} Triệu VND`;
    }

/**
 * TÍNH TIỀN CÁP
 * 
 * * Đầu vào:
 *   - Loại khách hàng (Doanh nghiệp/Cá nhân)
 *   - Mã khách hàng
 *   - Số kết nối (chỉ áp dụng cho doanh nghiệp)
 *   - Số kênh cao cấp
 * 
 * * Xử lý:
 *   - Tính tiền cáp dựa trên loại khách hàng:
 *     + Cá nhân:
 *       · Phí xử lý hóa đơn: 4.5 USD
 *       · Phí dịch vụ cơ bản: 20.5 USD
 *       · Phí kênh cao cấp: 7.5 USD/kênh
 *     + Doanh nghiệp:
 *       · Phí xử lý hóa đơn: 15 USD
 *       · Phí dịch vụ cơ bản: 75 USD cho 10 kết nối đầu tiên, thêm 5 USD/kết nối từ kết nối thứ 11 trở đi
 *       · Phí kênh cao cấp: 50 USD/kênh
 * 
 * * * Đầu ra:
 *  - Tổng tiền cáp phải trả
 */

const PHI = {
    CA_NHAN: {
        XU_LY: 4.5,
        CO_BAN: 20.5,
        KENH_CAO_CAP: 7.5
    },
    DOANH_NGHIEP: {
        XU_LY: 15,
        CO_BAN_10_KET_NOI: 75,
        THEM_KET_NOI: 5,
        KENH_CAO_CAP: 50
    }
}


function xuLyLoaiKhachHang() {
    const divSoKetNoi = document.getElementById("divSoKetNoi");

    if (document.getElementById("doanhNghiep").checked) {
        divSoKetNoi.style.display = "block";
    } else {
        divSoKetNoi.style.display = "none";
        document.getElementById("soKetNoi").value = "";
    }
}


function layLoaiKhachHang() {
    if (document.getElementById("caNhan").checked) return "CA_NHAN";
    if (document.getElementById("doanhNghiep").checked) return "DOANH_NGHIEP";
    return null;
}


function tinhTienCapTheoThongTin(loai, soKetNoi, soKenhCaoCap) {
    if (loai === "CA_NHAN") {
        return (
            PHI.CA_NHAN.XU_LY +
            PHI.CA_NHAN.CO_BAN +
            soKenhCaoCap * PHI.CA_NHAN.KENH_CAO_CAP
        );
    }

    if (loai === "DOANH_NGHIEP") {
        const phiKetNoi =
            soKetNoi <= 10
                ? PHI.DOANH_NGHIEP.CO_BAN_10_KET_NOI
                : PHI.DOANH_NGHIEP.CO_BAN_10_KET_NOI +
                (soKetNoi - 10) * PHI.DOANH_NGHIEP.THEM_KET_NOI;

        return (
            PHI.DOANH_NGHIEP.XU_LY +
            phiKetNoi +
            soKenhCaoCap * PHI.DOANH_NGHIEP.KENH_CAO_CAP
        );
    }

    return 0;
}


function tinhTienCap() {
    const maKH = document.getElementById("code").value.trim();
    const loaiKH = layLoaiKhachHang();
    const soKenhCaoCap = parseInt(document.getElementById("soKenhCaoCap").value);
    const soKetNoi = parseInt(document.getElementById("soKetNoi").value);

    if (!maKH) {
        alert("Vui lòng nhập mã khách hàng!");
        return;
    }

    if (!loaiKH) {
        alert("Vui lòng chọn loại khách hàng!");
        return;
    }

    if (loaiKH === "DOANH_NGHIEP" && soKetNoi <= 0) {
        alert("Vui lòng nhập số kết nối!");
        return;
    }

    const tienCap = tinhTienCapTheoThongTin(loaiKH, soKetNoi, soKenhCaoCap);

    hienThiTienCap(tienCap);
}


function hienThiTienCap(tienCap) {
    document.getElementById("divThanhTien").style.display = "block";
    document.getElementById("xuatTien").innerHTML =
        `${tienCap.toLocaleString()} $`;
}


