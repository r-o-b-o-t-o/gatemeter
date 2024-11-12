import type { ComponentProps } from "solid-js";

import { ark } from "@ark-ui/solid";
import { styled } from "styled-system/jsx";
import { spinner } from "styled-system/recipes";

export type SpinnerProps = ComponentProps<typeof Spinner>;
export const Spinner = styled(ark.div, spinner);
