import React from "react";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";
import { CiCircleChevLeft } from "react-icons/ci";

const Invoice = ({
  userId,
  userName,
  usermobile,
  useraddress,
  userlandmark,
  userpincode,
  usercity,
  userstate,
  usercountry,
  awb,
  paymentAddress,
  products,
  orderId,
  onAfterPrint,
}) => {
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: onAfterPrint,
  });

  const totalQuantity = products?.reduce((total, product) => {
    return total + (product?.quantity || 0);
  }, 0);

  React.useEffect(() => {
    if (handlePrint) {
      handlePrint();
    }
  }, [handlePrint]);

  return (
    <div
      ref={componentRef}
      style={{
        border: "1px solid black",
        height: "auto",
        margin: "40px",
      }}
    >
      <div style={{ display: "flex" }}>
        {/* <!-- left --> */}
        <div
          style={{ flex: 1, borderRight: "1px solid black", padding: "2px" }}
        >
          <h3 style={{ fontWeight: 700 }}>1444 Nomizo</h3>
          <p style={{ fontWeight: 700 }}>GST NO: 03AAMFK4965G1Z6</p>
          <p>486, Kidwai Nagar, Janakpuri</p>
          <p>141008 - Ludhiana, Punjab, India</p>
        </div>
        {/* <!-- right --> */}
        <div style={{ flex: 1, padding: "2px" }}>
          <div style={{ display: "flex", borderBottom: "1px solid black" }}>
            <div
              style={{
                flex: 1,
                borderRight: "1px solid black",
                padding: "2px",
              }}
            >
              Order No. (REF): {orderId}
            </div>
            <div style={{ flex: 1, padding: "2px" }}>GST-JR-3557</div>
          </div>
          <div
            style={{
              flex: 1,
              borderBottom: "1px solid black",
              padding: "2px",
              textAlign: "center",
            }}
          >
            Mode: Prepaid
          </div>
          <div style={{ flex: 1 }}>Courier Partner: COFFEECULTURE</div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid black", padding: "2px" }}>
        <h3 style={{ fontWeight: 700 }}>
          {userName} (M) {usermobile}
        </h3>
        <p>Address: {useraddress}</p>
        <p>Landmark: {userlandmark}</p>
        <p>
          Pincode: {userpincode}, {usercity}, {userstate}, {usercountry}
        </p>
      </div>
      <div style={{ borderTop: "1px solid black", padding: "0px" }}>
        <div style={{ textAlign: "center", height: "100px" }}>
          <h2 style={{ fontWeight: 700 }}>AWB: {awb} </h2>
          <Barcode value={awb} />
        </div>
        {/* Table */}
        <table
          style={{
            borderTop: "1px solid black",
            borderCollapse: "collapse",
            width: "100%",
            height: "10px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  width: "8%",
                  borderLeft: "1px solid black",
                  textAlign: "start",
                }}
              >
                S.No.
              </th>
              <th
                style={{
                  width: "75%",
                  borderLeft: "1px solid black",
                  textAlign: "start",
                }}
              >
                Product(s)
              </th>
              <th
                style={{
                  width: "16%",
                  borderLeft: "1px solid black",
                  textAlign: "start",
                }}
              >
                QTY(Pcs)
              </th>
            </tr>
          </thead>
          <tbody
            style={{
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            {products?.map((product, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid black",
                  paddingBottom: "10px",
                }}
              >
                <th style={{ borderLeft: "1px solid black" }}>{index + 1}</th>
                <td style={{ borderLeft: "1px solid black" }}>
                  {product?.title}
                </td>
                <td style={{ borderLeft: "1px solid black" }}>
                  {product?.quantity}
                </td>
              </tr>
            ))}
            <tr style={{ height: "150px" }}>
              <th style={{ borderLeft: "1px solid black" }}></th>
              <td style={{ borderLeft: "1px solid black" }}></td>
              <td style={{ borderLeft: "1px solid black" }}></td>
            </tr>
            <tr style={{ height: "150px" }}>
              <th style={{ borderLeft: "1px solid black" }}></th>
              <td style={{ borderLeft: "1px solid black" }}></td>
              <td style={{ borderLeft: "1px solid black" }}></td>
            </tr>
            <tr style={{ borderTop: "1px solid black" }}>
              <th style={{ borderLeft: "1px solid black" }}>
                T{products?.length}
              </th>
              <td style={{ borderLeft: "1px solid black" }}>
                T{products?.length}
              </td>
              <td style={{ borderLeft: "1px solid black" }}>{totalQuantity}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ padding: "0px" }}>
        <div style={{ textAlign: "center", height: "100px", width: "full" }}>
          <h5 style={{ fontWeight: "bold" }}>{orderId}</h5>
          <Barcode value={orderId} />
        </div>
      </div>
      <div style={{ borderTop: "1px solid black", padding: "6px" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontWeight: 700, fontSize: "26px" }}>
            TAX INVOICE - 444 Nomizo
          </h2>
          <p style={{ fontWeight: "bold" }}>
            This is a computer-generated tax invoice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
