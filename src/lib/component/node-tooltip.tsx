export type InteractionData = {
  xPos: number;
  yPos: number;
  name: string;
};

type TooltipProps = {
  interactionData: InteractionData | null;
};

export const NodeTooltip = ({ interactionData }: TooltipProps) => {
  if (!interactionData) {
    return null;
  }

  return (
    <div
      style={{
        left: interactionData.xPos,
        top: interactionData.yPos,
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: "4px",
        color: "white",
        fontSize: "12px",
        padding: "4px",
        marginLeft: "15px",
        transform: "translateY(-50%)",
      }}
    >
      {interactionData.name}
    </div>
  );
};
