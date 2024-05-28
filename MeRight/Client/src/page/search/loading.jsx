import React from "react";
import {Bars} from 'react-loader-spinner';

function Loading(){
    return(
        <>
            <Bars
                color='#3d66ba'
                height={30}
                width={30}
                timeout={3000}
                />
        </>
    )
}

export default Loading;