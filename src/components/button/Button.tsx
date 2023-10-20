import ButtonBase from './ButtonBase';

export default function Button(props: {
  children?: string;
  class?: string;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <ButtonBase component={'button'} type={props.type} class={props.class}>
      {props.children}
    </ButtonBase>
  );
}
