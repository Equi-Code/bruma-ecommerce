
import { useState } from "react";


export default function Contador (){

    const [contador, setContador] = useState (0);

    const incrementar = () => {

        setContador (contador + 1);
    }

    return(

            <button onClick={incrementar}>+</button>
        


    );


}