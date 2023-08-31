import React from "react";
import {
  Badge,
  Drawer,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { DataHandlerReturnType } from "../util/data-handler.ts";
import { ArrayElement } from "../types/data-type.ts";

export const DrawerContent = ({
  opened,
  close,
  clickedNode,
}: {
  opened: boolean;
  close: () => void;
  clickedNode: ArrayElement<DataHandlerReturnType> | null | undefined;
}) => {
  const { height } = useViewportSize();
  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="right"
      size="md"
      scrollAreaComponent={ScrollArea.Autosize}
      overlayProps={{ opacity: 0.2 }}
      withCloseButton={false}
      styles={(t) => ({
        root: {
          wordBreak: "keep-all",
        },
        content: {
          backgroundColor: "transparent",
        },
        body: {
          padding: 0,
          marginRight: t.spacing.md,
          marginTop: t.spacing.md,
        },
      })}
    >
      <Paper
        sx={(t) => ({
          borderRadius: t.radius.md,
        })}
      >
        <ScrollArea h={height - 32} p="md">
          <Text fz={40} fw={600}>
            Lorem Ipsum
          </Text>
          <Stack spacing="xs" mt="md">
            <Badge size="xs" w={200}>
              Article id : {clickedNode?.id}
            </Badge>
            <Badge size="xs" w={200}>
              Cluster id : {clickedNode?.group_id}
            </Badge>
          </Stack>
          <Group spacing="sm" mt="xs">
            <Badge variant="dot" size="xs">
              x : {clickedNode?.x}
            </Badge>
            <Badge variant="dot" size="xs">
              y : {clickedNode?.y}
            </Badge>
          </Group>
          <Text color="dimmed" size="sm" mt="md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            vitae mollis dui. Duis id blandit justo, non scelerisque risus.
            Aenean tempus a quam sit amet laoreet. Suspendisse volutpat mi leo,
            at mattis lacus porttitor ut. Sed cursus neque risus, eu malesuada
            tellus feugiat quis. Nunc nunc leo, efficitur ac tempus at, placerat
            eget neque. Duis lacus nisi, auctor ac est eget, tempus tempus arcu.
            Praesent viverra pellentesque elit in hendrerit. Curabitur ipsum
            urna, consequat quis auctor sit amet, dictum non justo. Suspendisse
            sit amet condimentum diam, vitae vulputate tellus. Pellentesque
            porttitor elementum elit. Cras vitae elit finibus, vulputate mi
            vitae, luctus erat. Pellentesque consequat, massa et bibendum
            feugiat, lectus odio aliquet ante, et tempor ante purus quis ipsum.
            Morbi imperdiet orci ac nulla mollis, in pellentesque eros maximus.
            Duis quis sagittis velit. Praesent dignissim, justo at vulputate
            eleifend, ligula lectus tristique lacus, at facilisis mi turpis et
            quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Quisque vitae mollis dui. Duis id blandit justo, non scelerisque
            risus. Aenean tempus a quam sit amet laoreet. Suspendisse volutpat
            mi leo, at mattis lacus porttitor ut. Sed cursus neque risus, eu
            malesuada tellus feugiat quis. Nunc nunc leo, efficitur ac tempus
            at, placerat eget neque. Duis lacus nisi, auctor ac est eget, tempus
            tempus arcu. Praesent viverra pellentesque elit in hendrerit.
            Curabitur ipsum urna, consequat quis auctor sit amet, dictum non
            justo. Suspendisse sit amet condimentum diam, vitae vulputate
            tellus. Pellentesque porttitor elementum elit. Cras vitae elit
            finibus, vulputate mi vitae, luctus erat. Pellentesque consequat,
            massa et bibendum feugiat, lectus odio aliquet ante, et tempor ante
            purus quis ipsum. Morbi imperdiet orci ac nulla mollis, in
            pellentesque eros maximus. Duis quis sagittis velit. Praesent
            dignissim, justo at vulputate eleifend, ligula lectus tristique
            lacus, at facilisis mi turpis et quam. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Quisque vitae mollis dui. Duis id
            blandit justo, non scelerisque risus. Aenean tempus a quam sit amet
            laoreet. Suspendisse volutpat mi leo, at mattis lacus porttitor ut.
            Sed cursus neque risus, eu malesuada tellus feugiat quis. Nunc nunc
            leo, efficitur ac tempus at, placerat eget neque. Duis lacus nisi,
            auctor ac est eget, tempus tempus arcu. Praesent viverra
            pellentesque elit in hendrerit. Curabitur ipsum urna, consequat quis
            auctor sit amet, dictum non justo. Suspendisse sit amet condimentum
            diam, vitae vulputate tellus. Pellentesque porttitor elementum elit.
            Cras vitae elit finibus, vulputate mi vitae, luctus erat.
            Pellentesque consequat, massa et bibendum feugiat, lectus odio
            aliquet ante, et tempor ante purus quis ipsum. Morbi imperdiet orci
            ac nulla mollis, in pellentesque eros maximus. Duis quis sagittis
            velit. Praesent dignissim, justo at vulputate eleifend, ligula
            lectus tristique lacus, at facilisis mi turpis et quam.
          </Text>
        </ScrollArea>
      </Paper>
    </Drawer>
  );
};
