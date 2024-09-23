import React, { Component } from "react";
import { playApplauseSound } from "../utils/audioUtils";

interface OldMatadorProps {
  applause: number;
  setMatarodPosition: (position: number) => void;
  matadorPosition: number;
}

interface OldMatadorStates {
  forceRender: boolean;
  previousApplause: number,
}

class OldMatador extends Component<OldMatadorProps, OldMatadorStates> {

  constructor(props: OldMatadorProps) {
    super(props);
    this.state = {
      forceRender: false,
      previousApplause: props.applause,
    };
    this.handleBullRun = this.handleBullRun.bind(this); // Прив'язка методу до контексту
  }

  componentDidMount() {
    document.addEventListener("bullRun", this.handleBullRun as EventListener);
  }

  componentWillUnmount() {
    document.removeEventListener("bullRun", this.handleBullRun as EventListener);
  }

 // Порівнюємо пропси та оновлюємо стан
 static getDerivedStateFromProps(nextProps: OldMatadorProps, prevState:OldMatadorStates) {
  const { applause } = nextProps;
  
  //Запускаємо щоразу, коли оновлюємо оплески
  if (prevState.previousApplause !== applause) {
    playApplauseSound(applause);

    // Обробляємо оплески, що необхідні для ререндеру
    if (applause === 3 && prevState.previousApplause !== 3) {
      return {
        previousApplause: applause,
        forceRender: !prevState.forceRender 
      };
    }

    return {
      previousApplause: applause
    };
  }

  return null;
}

  //Функція обробник для зміни позиції бика
  handleBullRun(event: CustomEvent) {
    const nextBullPosition = event.detail.position;

    if (nextBullPosition === this.props.matadorPosition) {
      let newMatadorPosition = Math.floor(Math.random() * 8);
      newMatadorPosition =
        newMatadorPosition !== nextBullPosition
          ? newMatadorPosition
          : Math.abs(newMatadorPosition - 1);

      console.log(
        `Matador is moving from ${this.props.matadorPosition} to ${newMatadorPosition}`
      );
      this.props.setMatarodPosition(newMatadorPosition);
    }
  }

  // Компонент ререндериться, коли або змінена позиція, або при зміні стану forceRender (змінюється коли приходять оплески №3)
  shouldComponentUpdate(nextProps: OldMatadorProps, nextState: OldMatadorStates) {
    return (
      this.props.matadorPosition !== nextProps.matadorPosition ||
      this.state.forceRender !== nextState.forceRender
    );
  }

  render() {
    return (
      <img
        src="src/assets/picture/oldMatador.png"
        alt="I'm a matador"
        width="200"
      />
    );
  }
}

export default OldMatador;
