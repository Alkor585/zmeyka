function keyBinding(event) {
    if( event.code === 'ArrowRight') {
        moveDelta[0] = 1;
        moveDelta[1] = 0;
    } else if (
        event.code === 'ArrowLeft') {
            moveDelta[0] = -1;
            moveDelta[1] = 0;
        } else if (
            event.code==='ArrowDown'){
                moveDelta[0] = 0;
                moveDelta[1] = 1;
            } else if(event.code==='ArrowUp'){
                moveDelta[0] = 0;
                moveDelta[1] = -1;
            }
       

    {

    
    // event.code === '';

  }
};