import { MdDeleteForever, MdModeEdit } from 'react-icons/md';


const Note = ({ id, text, date, handleDeleteNote, handleeditnote }) => {
	return (
		<div className='note'>
			<textarea
			col = "10"
			rows = "8"
			value = {text}
			onChange = {()=>handleeditnote(id)}
			></textarea>
			<div className='note-footer'>
				<small>{date}</small>
				<MdModeEdit
					onClick={() => handleeditnote(id)}
					className='edit-icon'
					size='1.6rem'
				/>
				<MdDeleteForever
					onClick={() => handleDeleteNote(id)}
					className='delete-icon'
					size='1.6rem'
				/>
				
			</div>
		</div>
	);
};

export default Note;
