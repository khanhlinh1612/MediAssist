import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddPrescriptionModal.css';
import { CloseCircleTwoTone } from '@ant-design/icons';

export default function AddPrescriptionModal({ isOpen, onClose, onSubmit, data, status, drugNames }) {
    const [formData, setFormData] = useState([{
        name: '',
        dosage: '',
        quantity: ''
    }]);

    useEffect(() => {
        if (data && Array.isArray(data) && data.length > 0) {
            setFormData(data);
        }
        console.log("This is drug names", drugNames);
    }, [data, drugNames]);

    const clearFormData = () => {
        setFormData([{
            name: '',
            dosage: '',
            quantity: ''
        }]);
    }

    const cancel = () => {
        clearFormData();
        onSubmit([]);
        onClose();
    }

    const checkLastDrug = () => {
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

    const addMoreDrug = () => {
        if (checkLastDrug() && checkIsQuantity()) {
            setFormData(prevFormData => [...prevFormData, { name: '', dosage: '', quantity: '' }]);
        }
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newData = [...formData];
        newData[index][name] = value;
        setFormData(newData);
    };

    const handleDelete = (index) => {
        const updatedData = [...formData];
        updatedData.splice(index, 1);
        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checkLastDrug() && checkIsQuantity()) {
            onSubmit(formData);
            onClose();
        }
    };

    return (
        <Modal open={isOpen} onCancel={onClose} footer={[
            <button key="back" onClick={cancel} className='btn btn-warning addDrugBtn mt-3'>
                Hủy
            </button>,
            <button key="submit" type="primary" className='btn btn-success addDrugBtn mt-3' onClick={handleSubmit}>
                Lưu
            </button>,
        ]}>
            <h3 className='title-modal-prescription'>Thông tin đơn thuốc</h3>
            {status === 'create' && (
                <div className='add-drug-box'>
                    <button type="button" className='btn add-drug-btn' onClick={addMoreDrug}>Thêm thuốc</button>
                </div>
            )}

            <form onSubmit={handleSubmit} className='form-modal addDrug'>
                {formData.map((drug, index) => (
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
                            <label>Tên thuốc</label>
                            <input className="form-control" list="drugNames" name="name" value={drug.name} onChange={(e) => handleChange(index, e)} placeholder="Chọn tên thuốc..." />
                            <datalist id="drugNames">
                                {drugNames.map((drug, index) => (
                                    <option key={index} value={drug.value} />
                                ))}
                            </datalist>
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
                            <div className="input-group">
                                <input
                                    type="number"
                                    className='form-control w-50'
                                    placeholder='Nhập số lượng'
                                    name="quantity"
                                    value={drug.quantity}
                                    onChange={(e) => handleChange(index, e)}
                                />
                                <span className="input-group-text">( viên )</span>
                            </div>

                        </div>
                        <div className="drug-divider"></div>

                    </div>
                ))}

            </form>
        </Modal>
    );
}
