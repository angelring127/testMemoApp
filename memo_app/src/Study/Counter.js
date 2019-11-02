import React, { Component } from 'react';

class Counter extends Component {
    state = {
        number : 0
    }

    constructor(props) {
        super(props);
        console.log('construct');
    }

    componentDidMount() {
        // 컴포넌트가 마운트가 된 직후, 즉 트리에 삽입된 직후에 호출출
        // DOM노드가 있어야 하는 초기화는 여기서 하는게 좋다. 
        // 외부에서 데이터를 요청해야하는 경우 여기서 하는게 좋다. 
        // 이 메서드는 데이터 구독을 설정하기 좋은 위치입니다. 데이터 구독이 이루어졌다면, 
        // componentWillUnmount()에서 구독 해제 작업을 반드시 수행하기 바랍니다.
        console.log('componentDidMount');
    }

    componentDidUpdate(){
        // 갱신이 일어난 직후 호출이 됩니다.
        // 이 메서드는 최초 랜더링에서는 호출되지 않습니다.
        // 컴포넌트가 갱신되고 DOM을 조작해야할때 이 메서드를 활용하기 좋습니다.
        console.log('componentDidUpdate');
    }

    static getDerivedStateFromProps(props, state) {
        // render() 호출 되기 전에 호출됨
        // 여기서 setState를 하는것이 아님 
        // 특정 Props가 바뀔때 설정을 바꾸기위해 state형태로 전달
        console.log('getDerivedStateFromProps');

        // null를 리턴하는것은 따로 업데이트를 할것이 없다라는 뜻
        return null
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate');

        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        return true;
    }



    handleIncrease = () => {
        this.setState(
            ({ number }) => ({
                number : number + 1
            })
        );
    }

    handleDecrease = () => {
        const { number } = this.state;
        this.setState ({
            number: number + 1
        });
    }

    render() {
        console.log('render');
        return (
            <div>
                <h1>Counter</h1>
                <div>값: {this.state.number}</div>
                <button onClick={this.handleIncrease}>+</button>
                <button onClick={this.handleDecrease}>-</button>
            </div>
        );
    }
}

export default Counter;