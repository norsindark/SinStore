import { useState, useEffect } from "react";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "reactstrap";
import { paymentCallback } from "services/users/payment/payment.service";

const PaymentResult = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        paymentCallback();
    }, []);


    const vnp_Amount = searchParams.get('vnp_Amount');
    const vnp_BankCode = searchParams.get('vnp_BankCode');
    const vnp_BankTranNo = searchParams.get('vnp_BankTranNo');
    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
    const vnp_PayDate = searchParams.get('vnp_PayDate');
    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
    const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus');
    const vnp_TxnRef = searchParams.get('vnp_TxnRef');

    return (
        <section className="fp__cart_view mt_125 xs_mt_95 mb_100 xs_mb_70">
            <Container>
                <div className="header clearfix">
                    <h3 className="text-muted">PAYMENT RESULT</h3>
                </div>
                <div className="table-responsive">
                    <div className="form-group">
                        <label >PAYMENT ID:</label>
                        <label style={{ marginLeft: '12px' }}>{vnp_TxnRef}</label>
                    </div>
                    <div className="form-group">
                        <label >TOTAL AMOUNT:</label>
                        <label style={{ marginLeft: '12px' }}>{vnp_Amount} VNĐ</label>
                    </div>
                    <div className="form-group">
                        <label >ORDER ID:</label>
                        <label style={{ marginLeft: '12px' }}>{vnp_OrderInfo}</label>
                    </div>
                    <div className="form-group">
                        <label >Bank Tran No: </label>
                        <label style={{ marginLeft: '12px' }}>{vnp_BankTranNo}</label>
                    </div>
                    <div className="form-group">
                        <label >Transaction ID:</label>
                        <label style={{ marginLeft: '12px' }}>{vnp_TransactionNo}</label>
                    </div>
                    <div className="form-group">
                        <label >Bank Code:</label>
                        <label style={{ marginLeft: '12px' }}>{vnp_BankCode}</label>
                    </div>
                    <div className="form-group">
                        <label >Payment Time:</label>
                        <label style={{ marginLeft: '12px' }}>{vnp_PayDate}</label>
                    </div>
                    <div className="form-group">
                        <label >Transaction Status:</label>
                        <span style={{
                            marginLeft: '12px',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: vnp_TransactionStatus === '00' ? 'green' : 'red',
                            color: 'white'
                        }}>
                            {vnp_TransactionStatus === '00' ? 'SUCCESS' : 'FAILED'}
                        </span>
                    </div>
                </div>
            </Container >
        </section >
    );
};

export default PaymentResult;
