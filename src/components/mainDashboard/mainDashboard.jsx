import React, { useState, useEffect } from 'react';
import axios from 'axios';
import plus from '../../assets/plus.svg';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';
import arrow from '../../assets/arrow.svg';

const Dashboard = () => {
  const [columns, setColumns] = useState([]);
  const [columnTitle, setColumnTitle] = useState('');
  const [cardData, setCardData] = useState({ title: '', description: '', deadline: '', priority: 'without', columnId: null });
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [editingColumnId, setEditingColumnId] = useState(null);
  const [editingCardId, setEditingCardId] = useState(null);

  useEffect(() => {
    fetchColumns();
  }, []);

  
  const fetchColumns = () => {
    axios.get('http://localhost:5000/columns')
      .then(response => {
        setColumns(response.data);
      })
      .catch(error => {
        console.error('Error fetching columns:', error);
      });
  };

  const handleAddColumn = () => {
    if (!columnTitle.trim()) return;

    axios.post('http://localhost:5000/columns', { title: columnTitle })
      .then(() => {
        fetchColumns(); 
        resetColumnModal();
      })
      .catch(error => {
        console.error('Error adding column:', error);
      });
  };

  const handleAddCard = () => {
    if (!cardData.title.trim() || !cardData.columnId) return;

    const endpoint = editingCardId 
      ? axios.put(`http://localhost:5000/cards/${editingCardId}`, cardData)
      : axios.post('http://localhost:5000/cards', cardData);

    endpoint
      .then(() => {
        fetchColumns();
        resetCardModal();
      })
      .catch(error => {
        console.error(editingCardId ? 'Error updating card:' : 'Error adding card:', error);
      });
  };

  const handleDeleteColumn = (columnId) => {
    if (!window.confirm('Are you sure you want to delete this column and all its cards?')) return;

    axios.delete(`http://localhost:5000/columns/${columnId}`)
      .then(() => {
        setColumns(columns.filter(col => col.id !== columnId));
      })
      .catch(error => {
        console.error('Error deleting column:', error);
      });
  };

  const handleDeleteCard = (cardId) => {
    if (!window.confirm('Are you sure you want to delete this card?')) return;

    axios.delete(`http://localhost:5000/cards/${cardId}`)
      .then(() => {
        fetchColumns(); 
      })
      .catch(error => {
        console.error('Error deleting card:', error);
      });
  };

  const openEditColumnModal = (columnId) => {
    const column = columns.find(col => col.id === columnId);
    if (!column) return;
    
    setColumnTitle(column.title);
    setEditingColumnId(columnId);
    setShowColumnModal(true);
  };

  const openEditCardModal = (card, columnId) => {
    setCardData({
      title: card.title,
      description: card.description,
      deadline: card.deadline,
      priority: card.priority || 'without',
      columnId: columnId,
    });
    setEditingCardId(card.id);
    setShowCardModal(true);
  };

  const handleSaveColumnEdit = () => {
    if (!columnTitle.trim() || !editingColumnId) return;

    axios.put(`http://localhost:5000/columns/${editingColumnId}`, { title: columnTitle })
      .then(() => {
        fetchColumns();
        resetColumnModal();
      })
      .catch(error => {
        console.error('Error editing column:', error);
      });
  };

  const resetColumnModal = () => {
    setColumnTitle('');
    setEditingColumnId(null);
    setShowColumnModal(false);
  };

  const resetCardModal = () => {
    setCardData({ title: '', description: '', deadline: '',  
        priority: 'without', columnId: null });
    setEditingCardId(null);
    setShowCardModal(false);
  };

  const getPriorityBorderColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      case 'without': return 'border-gray-300';
      default: return 'border-gray-300';
    }
  };

  const getPriorityColorClass = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      case 'without': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="dashboard p-6 bg-background">
      <h3 className="p-[20px] text-left">Project office</h3>

      <div className="flex flex-wrap gap-[34px]  ">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col w-[334px] bg-transparent rounded-lg p-4">
            <div className="flex justify-between items-center mb-4 bg-card-bg p-4 rounded w-[334px] h-[56px]">
              <h2 className="text-lg-[14px] text-title">{column.title}</h2>
              <div className="flex gap-2">
              <button 
    onClick={() => openEditColumnModal(column.id)}
    className="text-title bg-transparent p-0 border-none"
  >
     <img 
    src={editIcon} 
    alt="edit" 
    className="w-[13px] h-[13px] opacity-50 hover:opacity-100" 
    style={{ filter: 'brightness(0) invert(1)' }} 
  />
  </button>
  
  <button 
    onClick={() => handleDeleteColumn(column.id)}
    className="text-title bg-transparent p-0 border-none"
  >
     <img 
    src={deleteIcon} 
    alt="edit" 
    className="w-[13px] h-[13px] opacity-50 hover:opacity-100" 
    style={{ filter: 'brightness(0) invert(1)' }} 
  />
  </button>
              </div>
            </div>

            <div className="space-y-4">
              {column.cards?.map((card) => (
                <div key={card.id} className={`bg-card-bg p-4 rounded-lg shadow-sm w-[334px] border-l-4 ${getPriorityBorderColor(card.priority)}`}>
                  <h3 className="text-[14px] font-[600] text-title">{card.title}</h3>
                  <p className=" text-title-[12px] mt-[8px] mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{card.description}</p>
                  <div>
                  <div className="w-[290px] h-[1px] bg-text"></div>
                  
                  {card.priority && (
                      <div className="flex items-center gap-2 my-2">
                        <span className={`w-4 h-4 rounded-full ${getPriorityColorClass(card.priority)}`}></span>
                        <span className="text-sm capitalize">{card.priority}</span>
                      </div>
                    )}

            <div className='flex flex-col '>
                <p>Deadline: </p>
                  {card.deadline && <p className="text-sm text-text mb-4">{card.deadline}</p>}
                  </div>
                  
                  <div className="flex gap-2">

                  <button onClick={() => handleDeleteCard(card.id)} className="bg-transparent">
                    <img 
    src={arrow} 
    alt="arrow" 
    className="w-[13px] h-[13px] opacity-50 hover:opacity-100" 
    style={{ filter: 'brightness(0) invert(1)' }} 
  />
                    </button>

                    <button onClick={() => openEditCardModal(card, column.id)} className="bg-transparent">
                    <img 
    src={editIcon} 
    alt="edit" 
    className="w-[13px] h-[13px] opacity-50 hover:opacity-100" 
    style={{ filter: 'brightness(0) invert(1)' }} 
  />
                    </button>

                    <button onClick={() => handleDeleteCard(card.id)} className="bg-transparent">
                    <img 
    src={deleteIcon} 
    alt="delete" 
    className="w-[13px] h-[13px] opacity-50 hover:opacity-100" 
    style={{ filter: 'brightness(0) invert(1)' }} 
  />
                    </button>
                  </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button 
                onClick={() => {
                  setCardData({ ...cardData, columnId: column.id });
                  setShowCardModal(true);
                }} 
                className="w-[334px] h-[56px] py-2 bg-primary text-white rounded-md hover:bg-secondary transition-all">
                Add Card
              </button>
            </div>
          </div>
        ))}

        <div className="mr-auto mt-3.5">
          <button 
            onClick={() => setShowColumnModal(true)} 
            className="text-title text-[14px] w-[334px] h-[56px] py-[10px] flex items-center justify-center gap-3.5 bg-card-bg rounded p-4 font-medium hover:bg-secondary transition-all">
            <img src={plus} alt="plus" className="bg-plus-icon rounded px-1 py-1" />
            Add another column
          </button>
        </div>
      </div>

      {/* Column Modal */}
      {showColumnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="mb-[24px] font-[18px]-[500]">{editingColumnId ? 'Edit Column' : 'Add Column'}</h2>
            <input
              type="text"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
              placeholder="Title"
              className="p-2 border border-text rounded mb-4 w-full font-[14px]"
            />

            <button
        onClick={editingColumnId ? handleSaveColumnEdit : handleAddColumn}
        className="text-title text-[14px] w-[334px] h-[56px] py-[10px] flex items-center justify-center gap-3.5 bg-primary rounded p-4 font-medium hover:bg-secondary transition-all"
      >
        <img src={plus} alt="plus" className="bg-plus-icon rounded px-1 py-1" />
        {editingColumnId ? 'Save' : 'Add'}
      </button>
      <button
              onClick={resetColumnModal}
              className="text-title text-[14px] w-[334px] h-[56px] py-[10px] flex items-center justify-center gap-3.5 bg-gray-500 rounded p-4 font-medium hover:bg-gray-600 mt-2"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* Card Modal */}
      {showCardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="mb-[24px] font-[18px]-[500]">{editingCardId ? 'Edit Card' : 'Add Card'}</h2>
            <input
              type="text"
              value={cardData.title}
              onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
              placeholder="Title"
              className="p-2 border border-text rounded mb-4 w-full"
              required
            />
            <textarea
              value={cardData.description}
              onChange={(e) => setCardData({ ...cardData, description: e.target.value })}
              placeholder="Description"
              className="p-2 border border-text rounded mb-4 w-full"
              rows="3"
            />
            <input
              type="date"
              value={cardData.deadline}
              onChange={(e) => setCardData({ ...cardData, deadline: e.target.value })}
              className="fle flox-col p-2 border border-text rounded mb-4 w-full"
            />

<div className="flex gap-4 mb-4">
              {['without', 'low', 'medium', 'high'].map((priority) => (
                <label key={priority} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={cardData.priority === priority}
                    onChange={() => setCardData({...cardData, priority})}
                    className="hidden"
                  />
                  <span 
                    className={`w-4 h-4 rounded-full ${getPriorityColorClass(priority)} cursor-pointer`}
                  ></span>
                  <span className="text-sm capitalize">{priority}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleAddCard} 
                className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-green-600">
                {editingCardId ? 'Save' : 'Add'}
              </button>
              <button 
                onClick={resetCardModal} 
                className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </div>
        </div>

        
      )}
    </div>
  );
};

export default Dashboard;