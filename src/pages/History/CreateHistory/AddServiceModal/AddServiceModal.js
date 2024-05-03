import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddServiceModal.css';
import { CloseCircleTwoTone } from '@ant-design/icons';
export default function AddServiceModal({ isOpen, onClose, onSubmit, data, serviceNames, status }) {
    const [formData, setFormData] = useState([{
        name: '',
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
            quantity: ''
        }]);
    }
    const cancel = () => {
        clearFormData();
        onSubmit([]);
        onClose();
    }

    const checkLastService = () => {
        const lastService = formData[formData.length - 1];
        // if (!lastService.name || !lastService.price || !lastService.quantity) {
        if (!lastService.name || !lastService.quantity) {
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
            return false;
        }
        return true;
    }

    const checkIsQuantity = () => {
        const isQuantityNumber = formData.every(service => {
            if (isNaN(service.quantity) || service.quantity <= 0) {
                return false;
            }
            else return true;
        }
        );
        if (!isQuantityNumber) {
            toast.warning("Số lượng phải là một số dương.", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return false;
        }
        return true;
    }

    const addMoreService = () => {
        if (checkLastService() && checkIsQuantity()) {
            setFormData(prevFormData => [...prevFormData, { name: '', quantity: '' }])
        }

    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newData = [...formData];
        newData[index][name] = value;
        setFormData(newData);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checkLastService() && checkIsQuantity()) {
            onSubmit(formData);
            onClose();
        }
    };

    const handleDelete = (index) => {
        const updatedData = [...formData];
        updatedData.splice(index, 1);
        setFormData(updatedData);
    };

    return (
        <Modal open={isOpen} onCancel={onClose} footer={[
            <button key="back" onClick={cancel} className='btn btn-warning addDrugBtn'>
                Hủy
            </button>,
            <button key="submit" type="primary" className='btn btn-success addDrugBtn' onClick={handleSubmit}>
                Lưu
            </button>,
        ]}>
            <h3 className='title-modal-service'>Thông tin dịch vụ</h3>
            {status === 'create' && (
                <div className='add-drug-box'>
                    <button type="button" className='btn add-drug-btn' onClick={addMoreService}>Thêm dịch vụ</button>
                </div>
            )}

            <form onSubmit={handleSubmit} className='form-modal addDrug'>
                {formData.map((service, index) => (
                    <div key={index}>
                        {index > 0 && (
                            <div className='header-container'>
                                <div className="delete-icon-container float-end">
                                    <CloseCircleTwoTone
                                        className='iconDelete'
                                        onClick={() => handleDelete(index)} />
                                </div>
                            </div>
                        )}
                        <div className="form-group">
                            <label>Tên dịch vụ</label>
                            <input className="form-control" list="serviceNames" name="name" value={service.name} onChange={(e) => handleChange(index, e)} placeholder="Chọn dịch vụ..." />
                            <datalist id="serviceNames">
                                {serviceNames.map((service, index) => (
                                    <option key={index} value={service.value} />
                                ))}
                            </datalist>
                        </div>


                        <div className="form-group">
                            <label>Số lượng</label>
                            <div className="input-group">
                                <input
                                    type="number"
                                    className='form-control w-50'
                                    placeholder='Nhập số lượng'
                                    name="quantity"
                                    value={service.quantity}
                                    onChange={(e) => handleChange(index, e)}
                                />
                                <span className="input-group-text">( lần )</span>
                            </div>

                        </div>
                        <div className="drug-divider"></div>
                    </div>
                ))}
            </form>
        </Modal>
    );
}
