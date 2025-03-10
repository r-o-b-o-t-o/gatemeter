import type { ComponentProps } from "solid-js";

import { ark } from "@ark-ui/solid";
import { styled } from "styled-system/jsx";
import { icon } from "styled-system/recipes";

export type IconProps = ComponentProps<typeof Icon>;
export const Icon = styled(ark.svg, icon);
