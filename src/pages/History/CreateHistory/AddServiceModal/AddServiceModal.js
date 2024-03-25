import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddServiceModal.css';
export default function AddServiceModal({ isOpen, onClose, onSubmit, data, status }) {
    const [formData, setFormData] = useState([{
        name: '',
        price: '',
        quantity: ''
    }]);

    useEffect(() => {
        if (data.length > 0) {
            setFormData(data);
        }
    }, [data]);

    const clearFormData = () => {
        setFormData([{
            name: '',
            price: '',
            quantity: ''
        }]);
    }
    const cancel = () => {
        clearFormData();
        onSubmit(null);
        onClose();
    }
    const addMoreService = () => {
        const lastService = formData[formData.length - 1];
        if (!lastService.name || !lastService.price || !lastService.quantity) {
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
        setFormData(prevFormData => [...prevFormData, { name: '', price: '', quantity: '' }]);
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newData = [...formData];
        newData[index][name] = value;
        setFormData(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isQuantityNumber = formData.every(service => !isNaN(service.quantity));

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
                <box-icon type='solid' name='x-circle' color='red' size='lg' className='icon-to-close' onClick={() => { onClose(); }} ></box-icon>
            </div>

            <h3 className='title-modal-service'>Thông tin dịch vụ</h3>
            {status === 'create' && (
                <div className='add-drug-box'>
                    <button type="button" className='btn add-drug-btn' onClick={addMoreService}>Thêm dịch vụ</button>
                </div>
            )}

            <form onSubmit={handleSubmit} className='form-modal'>
                {formData.map((service, index) => (
                    <div key={index}>
                        <div className="form-group">
                            <label>Tên dịch vụ</label>
                            <input
                                className='form-control'
                                placeholder='Nhập tên dịch vụ'
                                name="name"
                                value={service.name}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Giá dịch vụ</label>
                            <input
                                className='form-control'
                                placeholder='Nhập giá dịch vụ'
                                name="price"
                                value={service.price}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số lượng</label>
                            <input
                                className='form-control'
                                placeholder='Nhập số lượng'
                                name="quantity"
                                value={service.quantity}
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
