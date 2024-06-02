import React, { useState, useEffect } from 'react';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CloseCircleTwoTone } from '@ant-design/icons';

const AddDrugForm = ({ data, onSubmit, drugNames, status, allowEdit, cancel}) => {
    const [formData, setFormData] = useState([{
        name: '',
        dosage: '',
        quantity: ''
    }]);
    const [originalData, setOriginalData] = useState(data);
    const [medicines, SetMedicines] = useState(data);
    useEffect(() => {
        if (data && Array.isArray(data) && data.length > 0) {
            setFormData(data);
        }
    }, [data, drugNames]);
    const handleCancel = () => {
        setFormData(originalData);
    };
    const clearFormData = () => {
        setFormData([{
            name: '',
            dosage: '',
            quantity: ''
        }]);
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
        const isQuantityNumber = formData.every(drug => {
            if (isNaN(drug.quantity) || drug.quantity <= 0) {
                return false;
            } else {
                return true;
            }
        });
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
            clearFormData();
        }
        else setFormData(originalData);
    };

    return (
        <div className="info-form-tab">
            <h3 className='title-modal-service'>Thông tin thuốc</h3>
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
                                        onClick={() => handleDelete(index)}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="form-group">
                            <label>Tên thuốc</label>
                            <input
                                className="form-control"
                                list="drugNames"
                                name="name"
                                value={drug.name}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Chọn tên thuốc..."
                            />
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
                {status === 'create' && (
                    <div className='add-drug-box'>
                        <button type="button" className='btn add-drug-btn' onClick={addMoreDrug}>Thêm thuốc</button>
                    </div>
                )}
                {allowEdit === "true" && (
                    <div>
                        <button key="back" onClick={cancel} className='btn btn-warning addDrugBtn'>
                            Hủy
                        </button>
                        <button key="submit" type="primary" className='btn btn-success addDrugBtn' onClick={handleSubmit}>
                            Lưu
                        </button>
                    </div>

                )}

            </form>
        </div>

    );
};

export default AddDrugForm;
