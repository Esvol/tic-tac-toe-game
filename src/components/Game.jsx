import React, { useEffect } from 'react'

import Cross from '../assets/cross.png'
import Circle from '../assets/circle.png'

import { useDispatch, useSelector } from 'react-redux'
import { setFields, setEnd, setPlayer, setReset, setStart } from '../redux/slices/game'

const Game = () => {
    const dispatch = useDispatch()

    const {player, end, fields, reset} = useSelector(state => state.game)

    useEffect(() => {
        if ((fields[0] === fields[1] && fields[1] === fields[2]) || (fields[0] === fields[3] && fields[3] === fields[6]) ||
            (fields[0] === fields[4] && fields[4] === fields[8]) || (fields[2] === fields[5] && fields[5] === fields[8]) ||
            (fields[2] === fields[4] && fields[4] === fields[6]) || (fields[6] === fields[7] && fields[7] === fields[8]) ||
            (fields[1] === fields[4] && fields[4] === fields[7]) || (fields[3] === fields[4] && fields[4] === fields[5])){
                dispatch(setEnd(true));
                if (player === 1) dispatch(setPlayer(2))
                else dispatch(setPlayer(1))
            }
    }, [fields])


    const ClickOnField = (e, id) => {
        if(!end){
            if (e.target.style.backgroundImage === ''){
                if (player === 1 ){
                    e.target.style.backgroundImage = `url(${Cross})`
                    dispatch(setFields(id))
                    dispatch(setPlayer(2))
                }
                else{
                    e.target.style.backgroundImage = `url(${Circle})`
                    dispatch(setFields(id))
                    dispatch(setPlayer(1))
                }
            }
        }        
    }

    return (
        <div className={`w-full h-screen px-32 py-16 ${player === 1 ? 'bg-red-300' : 'bg-blue-300'}`}>
            <h1 className='font-bold w-full mb-8 text-center text-3xl'>Tic Tac Toe</h1>
            {(end && !reset) && <p className='font-medium w-full mb-4 text-center text-xl'>Winner is Player {player}</p>}
            {reset && <p className='font-medium w-full mb-4 text-center text-xl'>Click "Start" to start again</p>}
            <p className='w-full text-center font-bold text-xl'>Turn: Player {player}</p>
            <div className='mt-6 mx-auto grid grid-cols-3 grid-rows-3 gap-4 max-w-[460px]'>
                {
                    fields.map((num, i) => <div key={i} onClick={(e) => ClickOnField(e, i)} style={{...(reset && {backgroundImage: 'none'})}} className='border w-36 h-36 bg-no-repeat bg-auto bg-center '></div>)
                }
            </div>
            <div className='w-full flex justify-center items-center mt-6'>
                <button onClick={() => dispatch(setStart())} className='bg-[#00df9a] px-8 py-2 rounded-lg'>Start</button>
                <button onClick={() => dispatch(setReset())} className='ml-20 bg-red-400 px-8 py-2 rounded-lg hover:translate-y-0.5 ease-in-out duration-200'>Reset</button>
            </div>
        </div>
    )
}

export default Game