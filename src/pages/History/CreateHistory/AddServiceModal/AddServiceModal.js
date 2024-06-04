import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { toast, Bounce } from 'react-toastify';
import { CloseCircleTwoTone } from '@ant-design/icons';
import './AddServiceModal.css';

const AddServiceModal = ({ isOpen, onClose, onSubmit, data, serviceNames, status }) => {
    const [formData, setFormData] = useState([{
        name: '',
        quantity: '',
        examResult: [{ index: '', testValue: '', unit: '' }],
        imageResult: null,
        conclusion: ''
    }]);

    const originalData = JSON.parse(JSON.stringify(data));

    useEffect(() => {
        if (data.length > 0) {
            setFormData(data);
        }
    }, [data]);

    const handleOnClose = () => {
        setFormData(originalData);
        onClose();
    };

    const clearFormData = () => {
        setFormData([{
            name: '',
            quantity: '',
            examResult: [{ index: '', testValue: '', unit: '' }],
            imageResult: null,
            conclusion: ''
        }]);
    };

    const cancel = () => {
        clearFormData();
        onSubmit([]);
        onClose();
    };

    const showToast = (message, autoClose = 2000) => {
        toast.warning(message, {
            position: "top-right",
            autoClose,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    const checkLastService = () => {
        const lastService = formData[formData.length - 1];
        if (!lastService.name || !lastService.quantity) {
            showToast("Vui lòng điền đầy đủ thông tin.");
            return false;
        }
        return true;
    };

    const checkIsQuantity = () => {
        const isQuantityNumber = formData.every(service => !isNaN(service.quantity) && service.quantity > 0);
        if (!isQuantityNumber) {
            showToast("Số lượng phải là một số dương.", 1500);
            return false;
        }
        return true;
    };

    const addMoreService = () => {
        if (checkLastService() && checkIsQuantity()) {
            setFormData(prevFormData => [...prevFormData, {
                name: '',
                quantity: '',
                examResult: [{ index: '', testValue: '', unit: '' }],
                imageResult: null,
                conclusion: ''
            }]);
        }
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => {
            const newData = [...prevFormData];
            newData[index][name] = value;
            return newData;
        });
    };

    const handleExamResultChange = (serviceIndex, resultIndex, e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => {
            const newData = [...prevFormData];
            newData[serviceIndex].examResult[resultIndex][name] = value;
            return newData;
        });
    };

    const addMoreExamResult = (serviceIndex) => {
        setFormData(prevFormData => {
            const newData = [...prevFormData];
            newData[serviceIndex].examResult.push({ index: '', testValue: '', unit: '' });
            return newData;
        });
    };

    const handleFileSelect = (index, e) => {
        const file = e.target.files[0] || null;
        setFormData(prevFormData => {
            const newData = [...prevFormData];
            newData[index].imageResult = file;
            return newData;
        });

        console.log("Updated formData:", formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkLastService() && checkIsQuantity()) {
            onSubmit(formData);
            onClose();
        }
    };

    const handleDelete = (index) => {
        setFormData(prevFormData => prevFormData.filter((_, i) => i !== index));
    };

    return (
        <Modal open={isOpen} onCancel={status === "update" ? handleOnClose : cancel} footer={[
            <button key="back" onClick={cancel} className='btn btn-warning addDrugBtn'>
                Hủy
            </button>,
            <button key="submit" type="primary" className='btn btn-success addDrugBtn' onClick={handleSubmit}>
                Lưu
            </button>,
        ]}>
            <h3 className='title-modal-service'>Thông tin dịch vụ</h3>
            <div className='add-drug-box'>
                <button type="button" className='btn add-drug-btn' onClick={addMoreService}>Thêm dịch vụ</button>
            </div>

            <form onSubmit={handleSubmit} className='form-modal addDrug'>
                {formData.map((service, serviceIndex) => (
                    <div key={serviceIndex}>
                        {serviceIndex > 0 && (
                            <div className='header-container'>
                                <div className="delete-icon-container float-end">
                                    <CloseCircleTwoTone
                                        className='iconDelete'
                                        onClick={() => handleDelete(serviceIndex)} />
                                </div>
                            </div>
                        )}
                        <div className="form-group">
                            <label>Tên dịch vụ</label>
                            <input
                                className="form-control"
                                list="serviceNames"
                                name="name"
                                value={service.name}
                                onChange={(e) => handleChange(serviceIndex, e)}
                                placeholder="Chọn dịch vụ..."
                            />
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
                                    onChange={(e) => handleChange(serviceIndex, e)}
                                />
                                <span className="input-group-text">( lần )</span>
                            </div>
                        </div>
                        {status === 'update' && (
                            <div className="form-group">
                                <label>Kết quả xét nghiệm</label>
                                {service.examResult.map((result, resultIndex) => (
                                    <div key={resultIndex} className="exam-result-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Chỉ số"
                                            name="index"
                                            value={result.index}
                                            onChange={(e) => handleExamResultChange(serviceIndex, resultIndex, e)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Giá trị xét nghiệm"
                                            name="testValue"
                                            value={result.testValue}
                                            onChange={(e) => handleExamResultChange(serviceIndex, resultIndex, e)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="Đơn vị"
                                            name="unit"
                                            value={result.unit}
                                            onChange={(e) => handleExamResultChange(serviceIndex, resultIndex, e)}
                                        />
                                    </div>
                                ))}
                                <button type="button" className='btn btn-secondary add-exam-result-btn mt-2' onClick={() => addMoreExamResult(serviceIndex)}>
                                    Thêm kết quả xét nghiệm
                                </button>
                            </div>
                        )}

                        {
                            status === 'update' && (
                                <div className="form-group">
                                    <label>Kết luận</label>
                                    <textarea
                                        className="form-control"
                                        name="conclusion"
                                        value={service.conclusion}
                                        onChange={(e) => handleChange(serviceIndex, e)}
                                        placeholder="Nhập kết luận"
                                    />
                                </div>
                            )
                        }


                        <div className="drug-divider"></div>
                    </div>
                ))}
            </form>
        </Modal>
    );
};

export default AddServiceModal;
