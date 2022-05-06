import React from 'react';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
    
    hideArrows: {
      "& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
        "WebkitAppearance": "none",
        "margin": 0
      },
      "& input[type=number]": {
        "MozAppearance": "textfield"
      }
    },
    hiddenDiv: {
        visibility: 'hidden',
        whiteSpace: 'nowrap'
    },
    numInput: {
        //minWidth:'100%',
        width: '100%',
        padding: 0,
        margin: 0,
        textAlign: 'center'
    },
    loaded: {
        //backgroundColor: 'green',
    },
    saving: {
        backgroundColor: 'orange',
    },
    saved: {
        animationName: '$savedAnimation',
        animationDuration: '2s'
    },
    error: {
        backgroundColor: 'red',
    },
    "@keyframes savedAnimation": {
        "0%": {
          backgroundColor: "orange"
        },
        "50%": {
          backgroundColor: "green"
        },
        "100%": {
          backgroundColor: "inherit"
        }
    },
})

class EditableValueField extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.state = { 
            editing: false,
        };
        this.inputRef = React.createRef();
    }

    handleKeyDown = (e, prevValue) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
        if (e.key === "Escape") {
            e.target.value = prevValue;
            e.target.blur();
        }
    }

    render() {
        const { value, status, onChange, classes } = this.props; 
        const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });
        const twoDecimalNoGrouping = new Intl.NumberFormat('en', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: false });

        let v = null;
        if (value) {
            v = twoDecimalNoGrouping.format(value);
        }

        return (this.state.editing /*|| Math.round(Math.random())*/ ) ?
            (<React.Fragment>
              <div className = {classes.hideArrows}>
                <input type='number' 
                    ref={this.inputRef} 
                    defaultValue={v} 
                    onBlur={() => this.onBlur(v, onChange)} 
                    className={ classes.numInput } 
                    onKeyDown={(e) => this.handleKeyDown(e, v)}
                 />
              </div>
            </React.Fragment>): 
            <div className={ classes[status] } onClick={(e) => this.onFocus(e)} >{value ? twoDecimal.format(value) : '-'}</div>
    }

    onFocus(e) {
        //const w = e.target.clientWidth;
        this.setState({ editing: true }, () => {
            //this.inputRef.current.style.width = w + 'px';
            this.inputRef.current.focus();
            this.inputRef.current.select();
        });
    }

    onBlur(prevValue, onChange) {
        this.setState({ editing: false });
        const newVal = this.inputRef.current.value;
        if ((newVal != '') && (newVal != prevValue)) {
            onChange(Number.parseFloat(newVal));
        }
    }
}

export default withStyles(styles)(EditableValueField);