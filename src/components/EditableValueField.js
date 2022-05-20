import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, keyframes }  from '@emotion/react';

const NumberInput = React.forwardRef(({...props}, ref) => (
    <input type='number' 
        ref={ref}
        {...props}
    />
));

const hideArrows = css`
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &[type=number] {
        -moz-appearance: textfield;
    }
`

const NumderInputStyled = styled(NumberInput)`
    ${hideArrows}
    width: 100%;
    padding: 0;
    margin: 0;
    text-align: center;
`
const savedAnimation = keyframes`
    0% {
        background-color: orange;
    }
    50% {
        background-color: green;
    },
    100% {
        background-color: inherit;
    }
`

const Div = styled.div`
    &.loaded {
        
    },
    &.saving {
        background-color: orange;
    },
    &.saved {
        animation-name: ${savedAnimation};
        animation-duration: 2s;
    },
    &.error {
        background-color: 'red',
    },
`

const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });
const twoDecimalNoGrouping = new Intl.NumberFormat('en', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: false });

const handleKeyDown = (e, prevValue) => {
    if (e.key === 'Enter') {
        e.target.blur();
    }
    if (e.key === "Escape") {
        e.target.value = prevValue;
        e.target.blur();
    }
}

const EditableValueField = (props) => {
    const { value, status, onChange } = props;
    const [editing, setEditing] = useState(false);
    const inputRef = React.createRef();

    useEffect(() => {
        if (editing === true) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editing])

    if (editing === true) {
        const onBlur = (prevValue, onChange) => {
            setEditing(false);
            const newVal = inputRef.current.value;
            if ((newVal != '') && (newVal != prevValue)) {
                onChange(Number.parseFloat(newVal));
            }
        }

        let v = null;
        if (value) {
            v = twoDecimalNoGrouping.format(value);
        }
        return (
            <NumderInputStyled
                ref={inputRef}
                defaultValue={v} 
                onBlur={() => onBlur(v, onChange)} 
                onKeyDown={(e) => handleKeyDown(e, v)}
                onWheel={(e) => e.target.blur()}
            />
        );
    } else {
        return (
            <Div className={ status } onClick={() => setEditing(true)} >{value ? twoDecimal.format(value) : '-'}</Div>
        );
    }
    
}

export default EditableValueField;