import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import plans from "../Premium/config/PremiumData";

const paymentMethods = [
  { id: "credit_card", name: "Thẻ tín dụng / Debit" },
  { id: "e_wallet", name: "Ví điện tử (Momo, ZaloPay, PayPal)" },
  { id: "bank_transfer", name: "Chuyển khoản ngân hàng" },
];

const PremiumRegister = () => {
  const { id } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const plan = plans.find((item) => item.id === id);
    setSelectedPlan(plan || null);
  }, [id]);

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    alert(`Bạn đã chọn thanh toán bằng: ${selectedPayment}`);
    // Tại đây, bạn có thể gọi API xử lý thanh toán
  };

  return (
    <div className="w-full h-100 py-2">
      <div className="bg-[#141414] h-full rounded-xl text-center text-white py-3">
        <div
          className="flex flex-col text-left justify-center pt-8"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #141414 9%, #590F33 30%, #9C0B50 48%, #521030 72%, #141414 90%)",
            height: "250px",
          }}
        >
          <h1 className="text-3xl ml-10 font-bold mb-3 text-white">
            Thanh toán
          </h1>
          <p className="text-lg ml-10 text-gray-300 mb-10">
            Bạn đang tiến hành thanh toán cho gói premium
          </p>
        </div>

        <div className="flex bg-gray-900 px-10 py-5">
          {/* Hiển thị thông tin gói Premium */}
          <div className="w-2/3 rounded-xl bg-gray-950 px-5 py-5 shadow-lg max-w-md">
            {selectedPlan ? (
              <>
                <h2 className="text-xl text-center font-bold mb-4">
                  {selectedPlan.title}
                </h2>
                <p className="text-center text-xl font-semibold text-green-400">
                  Giá gói chỉ {selectedPlan.price}
                </p>
                <p className="text-center text-xl font-semibold text-green-400">
                  Thời hạn sử dụng trong vòng {selectedPlan.duration} với các tính năng
                </p>
                <ul className="mt-4 text-gray-300 space-y-2 text-sm">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex justify-center items-center space-x-2">
                      <span className="text-green-400">✔</span> <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-center text-red-400">Không tìm thấy gói premium.</p>
            )}
          </div>

          {/* Phần chọn phương thức thanh toán */}
          <div className="w-1/3 text-white px-5">
            <h2 className="text-xl text-left font-bold mb-3">Phương thức thanh toán</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-3 border rounded-md cursor-pointer ${selectedPayment === method.name
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300"
                    }`}
                  onClick={() => handlePaymentSelect(method.name)}
                >
                  {method.name}
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              {/* Nút xác nhận thanh toán */}
              <button
                onClick={handlePayment}
                className="w-[20rem] bg-blue-500 text-white py-2 mt-5 rounded-md hover:bg-blue-600 transition"
              >
                Xác nhận thanh toán
              </button>

              {/* Nút quay lại */}
              <button
                onClick={() => {
                  const navigate = useNavigate();
                  navigate(`/premium`);
                }}
                className="w-[20rem] bg-gray-500 text-white py-2 mt-5 rounded-md hover:bg-black transition"
              >
                Đăng ký gói khác
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumRegister;
