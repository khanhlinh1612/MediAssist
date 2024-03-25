import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddPrescriptionModal.css';
export default function AddPrescriptionModal({ isOpen, onClose, onSubmit, data, status }) {
    const [formData, setFormData] = useState([{
        name: '',
        dosage: '',
        quantity: ''
    }]);

    useEffect(() => {

        if (data && Array.isArray(data) && data.length > 0) {
            setFormData(data);
        }
    }, [data]);

    const clearFormData = () => {
        setFormData([{
            name: '',
            dosage: '',
            quantity: ''
        }]);
    }
    const cancel = () => {
        clearFormData();
        onSubmit(null);
        onClose();
    }
    const addMoreDrug = () => {
        const lastDrug = formData[formData.length - 1];
        if (!lastDrug.name || !lastDrug.dosage || !lastDrug.quantity) {
            toast.warning("Vui lòng điền đầy đủ thông tin.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        setFormData(prevFormData => [...prevFormData, { name: '', dosage: '', quantity: '' }]);
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newData = [...formData];
        newData[index][name] = value;
        setFormData(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isQuantityNumber = formData.every(drug => !isNaN(drug.quantity));

        if (!isQuantityNumber) {
            toast.warning("Số lượng phải là một số.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <ToastContainer />
            <div className='close-icon' >
                <box-icon type='solid' name='x-circle' color='red' size='lg' className='icon' onClick={() => { onClose(); }} ></box-icon>
            </div>

            <h3 className='title-modal-prescription'>Thông tin đơn thuốc</h3>
            {status === 'create' && (
                <div className='add-drug-box'>
                    <button type="button" className='btn add-drug-btn' onClick={addMoreDrug}>Thêm thuốc</button>
                </div>
            )}

            <form onSubmit={handleSubmit} className='form-modal'>
                {formData.map((drug, index) => (
                    <div key={index}>
                        <div className="form-group">
                            <label>Tên thuốc</label>
                            <input
                                className='form-control'
                                placeholder='Nhập tên thuốc'
                                name="name"
                                value={drug.name}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Liều dùng</label>
                            <input
                                className='form-control'
                                placeholder='Nhập liều lượng'
                                name="dosage"
                                value={drug.dosage}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số lượng</label>
                            <input
                                className='form-control'
                                placeholder='Nhập số lượng'
                                name="quantity"
                                value={drug.quantity}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="drug-divider"></div>
                    </div>
                ))}
                <div className='btn-group'>
                    {status === 'create' && (
                        <div>
                           <button type="button" className='btn btn-warning' onClick={cancel}>Hủy</button>
                        </div>
                    )}

                    <button type="submit" className='btn btn-success'>{status === 'create' ? 'Lưu' : 'Cập Nhật'}</button>
                </div>
            </form>
        </Modal>
    );
}
