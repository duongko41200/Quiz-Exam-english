import React, { useEffect, useState } from 'react';
import { use } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Box } from '@mui/material';

const ItemTypes = {
	BOX: 'box',
};

const PART_TWO = 2;

const TITLE = 0;
const DEAR_PERSON = 1;
const FOOT_FISH = 2;

const BoxText = ({ id, content, column, moveItem }) => {
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
				// padding: '8px',
				margin: '4px',
				backgroundColor: column === 2 ? 'lightblue' : 'lightgreen',
				cursor: 'move',
				zIndex: 1,
				position: 'relative',
			}}
		>
			<div className="border border-gray-200 my-1 bg-white rounded">
				<Box
					sx={{
						width: '250px',
						height: '100px',
						border: '1px solid #939393',
						backgroundColor: '#fff',
						borderRadius: '2px',
					}}
				>
					<Box sx={{ textAlign: 'center' }}>
						<DragHandleIcon />
					</Box>

					<Box
						sx={{
							textAlign: 'left',
							fontSize: '14px',
							padding: '7px 9px',
						}}
					>
						{content}
					</Box>
				</Box>
			</div>
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
		<Box
			ref={(node) => {
				drag(node);
				drop(node);
			}}
			className="bg-white border rounded min-h-[50px] flex items-center justify-center cursor-move"
			sx={{
				width: '400px',
				maxWidth: '400xx',
				minHeight: '3.5em',
				backgroundColor: '#F4F6F9',
				borderRadius: '2px',
				position: 'relative',
			}}
		>
			<Box
				sx={{
					width: '400px',
					border: '2px dashed #939393',
					minHeight: '3.5em',
					backgroundColor: '#F4F6F9',
					borderRadius: '2px',
					padding: '5px',
					fontSize: '14px',

					position: 'absolute',
					padding: '5px',
					fontSize: '14px',
				}}
			>
				{content}
			</Box>
		</Box>
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
				zIndex: isDraggings ? 5 : 0,
				width: '100%',
			}}
		></div>
	);
};

const DragDropApp = () => {
	const [column1, setColumn1] = useState(Array(5).fill(null));
	const [column2, setColumn2] = useState([]);
	const [pointActive, setPointActive] = useState(null);
	const [contentPartTwo, setContentPartTwo] = useState();
	const dispatch = useDispatch();

	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

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

	useEffect(() => {
		const readingPartTwo = testBankData.reading.part2[RES_DATA].data;

		const answerList = readingPartTwo?.questions?.answerList;

		let answerListPart2 = [];

		for (let i = 0; i < answerList.length; i++) {
			answerListPart2 = [
				...answerListPart2,
				{
					id: answerList[i].numberOrder.toString(),
					content: answerList[i].content,
				},
			];
		}

		setColumn2(answerListPart2);
		setContentPartTwo(readingPartTwo?.questions);
	}, [testBankData]);

	return (
		<DndProvider backend={HTML5Backend}>
			<Box>
				<Box sx={{ fontWeight: '700', fontSize: '16px' }}>
					{contentPartTwo?.content.split('tentisspace')[TITLE]}
				</Box>

				<Box
					sx={{
						border:
							'1px solid var(--secondary-400, #b0b0b0) !important',
						display: 'flex',
						maxWidth: 'fit-content',
						marginTop: '1rem',
					}}
				>
					{/* Box Left  */}
					<Box className=" box-left">
						<Box
							className="w-1/1    rounded"
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
								height: '600px',
							}}
						>
							<Box
								sx={{
									maxWidth: '400px',
								}}
							>
								<Box
									sx={{
										fontFamily: 'Inter, sans-serif !important',
										fontSize: '15px',
									}}
								>
									<strong>
										{
											contentPartTwo?.content.split('tentisspace')[
												DEAR_PERSON
											]
										}
									</strong>
								</Box>
								<Box>
									<Box sx={{ marginTop: '10px' }}>
										{
											contentPartTwo?.content.split('tentisspace')[
												FOOT_FISH
											]
										}
									</Box>
								</Box>
							</Box>
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
						</Box>
					</Box>

					{/* box right */}
					<Box
						className="colum-right"
						sx={{
							backgroundColor: '#F4F6F9',
							minWidth: '279px',
							height: 'auto',
							padding: '14px',
							overflow: 'hidden',
							maxWidth: '279px',
							display: 'flex',
							flexDirection: 'column',
							gap: '0.5rem',
						}}
					>
						{/* // box element */}

						{/* //Draggable items */}

						<div className="w-1/1 h-full  rounded relative">
							<DropBoxColumn2
								key="-1"
								id={-1}
								content={null}
								acceptBox={handleDrop}
								column={2}
								isDraggings={isDragging}
							/>
							{column2.map((box, index) => (
								<BoxText
									key={box.id}
									id={box.id}
									content={box.content}
									column={2}
									moveItem={handleDrop}
								/>
							))}
						</div>
					</Box>
				</Box>
			</Box>
		</DndProvider>
	);
};

export default DragDropApp;
