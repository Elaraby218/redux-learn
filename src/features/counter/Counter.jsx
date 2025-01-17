import { useSelector, useDispatch } from "react-redux"; 
import { increment, decrement , reset , incrementAmount} from "./counterSlice";
import { useState } from "react";

export default function Counter() {
    const count = useSelector((state) => state.counter.count); 
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(0) ; 
    const addval = Number(amount) || 0 ;

    function handleReset(){
        setAmount(0) ; 
        dispatch(reset()) ;
    }

    function handleInput(e){
        setAmount(e.target.value)
    }

    function handleAdd(){
        dispatch(incrementAmount(addval))
    }

    return (
        <>
            <section>
                <p>{count}</p>
                <div>
                    <button onClick={() => dispatch(increment())}>+</button>
                    <button onClick={() => dispatch(decrement())}>-</button>
                    <div>
                        <input type="text" placeholder="enter amount" onChange={handleInput} 
                        value={amount} />
                        <button onClick={handleAdd} >add</button>
                    </div>
                    <div>
                        <button onClick={handleReset}>ResetAll</button>
                    </div>
                </div>
            </section>
        </>
    );
}