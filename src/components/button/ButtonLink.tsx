import { A } from '@solidjs/router';
import ButtonBase from './ButtonBase';

export default function ButtonLink(props: {
  href: string;
  children?: string;
  class?: string;
}) {
  return (
    <ButtonBase component={A} href={props.href} class={props.class}>
      {props.children}
    </ButtonBase>
  );
}
