import React, { useEffect, useState } from 'react';
import { use } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
	BOX: 'box',
};

const Box = ({ id, content, column, moveItem }) => {
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.BOX,
		item: { id, content, column },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	// console.log('isDragging', isDragging);

	return (
		<div
			ref={drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				padding: '8px',
				margin: '4px',
				backgroundColor: column === 2 ? 'lightblue' : 'lightgreen',
				cursor: 'move',
				zIndex: 1,
				position: 'relative',
			}}
		>
			{content}
		</div>
	);
};

const DropBox = ({
	id,
	content,
	acceptBox,
	column,
	moveItem,
	setIsDragging,
}) => {
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.BOX,
		item: { id, content, column },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	useEffect(() => {
		if (isDragging) {
			setIsDragging(true);
		}
	}, [isDragging]);

	const [, drop] = useDrop({
		accept: ItemTypes.BOX,
		drop: (item) => acceptBox(item.id, id, item.content, item.column),
	});

	return (
		<div
			ref={(node) => {
				drag(node);
				drop(node);
			}}
			style={{
				opacity: isDragging ? 0.5 : 1,
				padding: '8px',
				margin: '4px',
				backgroundColor: content ? 'lightgreen' : 'lightgray',
				minHeight: '50px',
				cursor: 'move',
			}}
		>
			{content || 'Drop here'}
		</div>
	);
};

const DropBoxColumn2 = ({
	id,
	content,
	acceptBox,
	column,
	isDraggings,
}) => {
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.BOX,
		item: { id, content, column },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: ItemTypes.BOX,
		drop: (item) => acceptBox(item.id, id, item.content, item.column),
	});

	return (
		<div
			ref={(node) => {
				drag(node);
				drop(node);
			}}
			style={{
				opacity: 0,
				padding: '8px',
				margin: '4px',
				backgroundColor: content ? 'lightgreen' : 'lightgray',
				minHeight: '50px',
				cursor: 'move',
				position: 'absolute',
				height: '100%',
				zIndex: isDraggings ? 5 : 1,
				width: '100%',
			}}
		></div>
	);
};

const DragDropApp = () => {
	const [column1, setColumn1] = useState(Array(5).fill(null));
	const [column2, setColumn2] = useState([
		{ id: 1, content: 'Item 1' },
		{ id: 2, content: 'Item 2' },
		{ id: 3, content: 'Item 3' },
		{ id: 4, content: 'Item 4' },
		{ id: 5, content: 'Item 5' },
	]);

	const [isDragging, setIsDragging] = useState(false);

	/**
	 *
	 * @param {*} draggedId : id của item được kéo cootj 2
	 * @param {*} dropId : id vi trí thả vào cột 1
	 * @param {*} draggedContent : noi dung
	 * @param {*} fromColumn : keo tu cot nao
	 */

	// Handle dropping an item into another column
	const handleDrop = (
		draggedId,
		dropId,
		draggedContent,
		fromColumn
	) => {
		setIsDragging(false);
		console.log(draggedId, dropId, draggedContent, fromColumn);
		if (fromColumn === 2) {
			// Kéo item từ cột 2 vào cột 1
			setColumn2(column2.filter((box) => box.id !== draggedId));
			const updatedColumn1 = [...column1];
			const updatedColumn2 = [...column2].filter(
				(box) => box.id !== draggedId
			);
			if (updatedColumn1[dropId] === null) {
				updatedColumn1[dropId] = draggedContent;
			} else {
				const temp = updatedColumn1[dropId];

				console.log();
				updatedColumn1[dropId] = draggedContent;

				updatedColumn2.push({ id: draggedId, content: temp });
				setColumn2(updatedColumn2);
			}

			console.log({ updatedColumn1 });
			setColumn1(updatedColumn1);
		} else if (fromColumn === 1) {
			// Kéo item trong cột 1 để thay đổi vị trí

			if (dropId === -1) {
				// Thả vào cột 2
				if (column1[draggedId] === null) return;

				console.log('column1', column1);
				const updatedColumn1 = column1.map((box, index) => {
					if (index === draggedId) {
						box = null;
					}

					return box;
				});
				setColumn1(updatedColumn1);
				setColumn2([
					...column2,
					{ id: draggedId, content: draggedContent },
				]);
			} else {
				const updatedColumn1 = [...column1];
				const temp = updatedColumn1[dropId];
				updatedColumn1[dropId] = draggedContent;
				updatedColumn1[draggedId] = temp;
				setColumn1(updatedColumn1);
			}
		}
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div
				style={{ display: 'flex' }}
				className="w-[200px] h-[250px] relative"
			>
				<div style={{ marginRight: '16px' }}>
					<h3>Column 1</h3>
					{column1.map((content, index) => (
						<DropBox
							key={index}
							id={index}
							content={content}
							acceptBox={handleDrop} // Truyền acceptBox cho DropBox trong cột 1
							column={1}
							moveItem={handleDrop}
							setIsDragging={setIsDragging}
						/>
					))}
				</div>
				<div>
					<h3>Column 2</h3>
					<DropBoxColumn2
						key="-1"
						id={-1} // Sử dụng id đặc biệt để nhận thả vào cuối cột 2
						content={null}
						acceptBox={handleDrop}
						column={2}
						isDraggings={isDragging}
					/>
					{column2.map((box) => (
						<Box
							key={box.id}
							id={box.id}
							content={box.content}
							column={2}
							moveItem={handleDrop} // Truyền moveItem cho Box trong cột 2
						/>
					))}
				</div>
			</div>
		</DndProvider>
	);
};

export default DragDropApp;
