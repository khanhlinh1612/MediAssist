import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddServiceModal.css';
import { CloseCircleTwoTone } from '@ant-design/icons';

const AddServiceModal = ({ isOpen, onClose, onSubmit, data, serviceNames, status }) => {
    const [formData, setFormData] = useState([{
        nameService: '',
        quantity: '',
        examResult: [{ index: '', testValue: '', unit: '' }],
        imageResult: [''],
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
            nameService: '',
            quantity: '',
            examResult: [{ index: '', testValue: '', unit: '' }],
            imageResult: [''],
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
        if (!lastService.nameService || !lastService.quantity) {
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
                nameService: '',
                quantity: '',
                examResult: [{ index: '', testValue: '', unit: '' }],
                imageResult: [''],
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

    const handleExamResultChange = (serviceIndex, examIndex, e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => {
            const newData = [...prevFormData];
            newData[serviceIndex].examResult[examIndex][name] = value;
            return newData;
        });
    };

    const handleImageResultChange = (serviceIndex, imageIndex, e) => {
        const { value } = e.target;
        setFormData(prevFormData => {
            const newData = [...prevFormData];
            newData[serviceIndex].imageResult[imageIndex] = value;
            return newData;
        });
    };

    const addExamResult = (serviceIndex) => {
        setFormData(prevFormData => {
            const newData = [...prevFormData];
            newData[serviceIndex].examResult.push({ index: '', testValue: '', unit: '' });
            return newData;
        });
    };

    const removeExamResult = (serviceIndex, examIndex) => {
        setFormData(prevFormData => {
            const newData = [...prevFormData];
            newData[serviceIndex].examResult.splice(examIndex, 1);
            return newData;
        });
    };

    const addImageResult = (serviceIndex) => {
        setFormData(prevFormData => {
            const newData = [...prevFormData];
            newData[serviceIndex].imageResult.push('');
            return newData;
        });
    };

    const removeImageResult = (serviceIndex, imageIndex) => {
        setFormData(prevFormData => {
            const newData = [...prevFormData];
            newData[serviceIndex].imageResult.splice(imageIndex, 1);
            return newData;
        });
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
        <Modal open={isOpen} onCancel={handleOnClose} footer={[
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
                                name="nameService"
                                value={service.nameService}
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
                        {/* <div className="form-group">
                            <label>Kết quả xét nghiệm</label>
                            {service.examResult.map((exam, examIndex) => (
                                <div key={examIndex} className="exam-result">
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder='Chỉ số'
                                        name="index"
                                        value={exam.index}
                                        onChange={(e) => handleExamResultChange(serviceIndex, examIndex, e)}
                                    />
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder='Giá trị xét nghiệm'
                                        name="testValue"
                                        value={exam.testValue}
                                        onChange={(e) => handleExamResultChange(serviceIndex, examIndex, e)}
                                    />
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder='Đơn vị'
                                        name="unit"
                                        value={exam.unit}
                                        onChange={(e) => handleExamResultChange(serviceIndex, examIndex, e)}
                                    />
                                    <button type="button" onClick={() => removeExamResult(serviceIndex, examIndex)}>Xóa</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addExamResult(serviceIndex)}>Thêm kết quả xét nghiệm</button>
                        </div>
                        <div className="form-group">
                            <label>Kết quả hình ảnh</label>
                            {service.imageResult.map((image, imageIndex) => (
                                <div key={imageIndex} className="image-result">
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder='Đường dẫn hình ảnh'
                                        value={image}
                                        onChange={(e) => handleImageResultChange(serviceIndex, imageIndex, e)}
                                    />
                                    <button type="button" onClick={() => removeImageResult(serviceIndex, imageIndex)}>Xóa</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addImageResult(serviceIndex)}>Thêm kết quả hình ảnh</button>
                        </div>*/}
                        {/* <div className="form-group">
                            <label>Kết luận</label>
                            <textarea
                                className="form-control"
                                name="conclusion"
                                // value={service.conclusion}
                                onChange={(e) => handleChange(serviceIndex, e)}
                                placeholder="Nhập kết luận"
                            />
                        </div> */}
                        <div className="drug-divider"></div>
                    </div>
                ))}
            </form>
        </Modal>
    );
};

export default AddServiceModal;
