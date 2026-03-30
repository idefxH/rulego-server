import { BezierEdge, BezierEdgeModel } from '@logicflow/core';

class CustomEdge extends BezierEdge {}

class CustomEdgeModel extends BezierEdgeModel {
  // Set edge style
  getEdgeStyle() {
    const style = super.getEdgeStyle();
    if (this.isSelected) {
      style.stroke = '#466dfd';
    } else {
      style.stroke = '#d1d5dd';
    }
    return style;
  }

  // Set hover outline style
  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    style.hover.stroke = 'none';
    return style;
  }

  /**
   * Custom edge scheme to support updating edge path based on anchor position
   */
  updatePathByAnchor() {
    // TODO
    const sourceNodeModel = this.graphModel.getNodeModelById(this.sourceNodeId);
    const sourceAnchor = sourceNodeModel
      ?.getDefaultAnchor()
      .find((anchor) => anchor.id === this.sourceAnchorId);
    const targetNodeModel = this.graphModel.getNodeModelById(this.targetNodeId);
    const targetAnchor = targetNodeModel
      ?.getDefaultAnchor()
      .find((anchor) => anchor.id === this.targetAnchorId);

    if (sourceAnchor) {
      const startPoint = {
        x: sourceAnchor?.x,
        y: sourceAnchor?.y,
      };
      this.updateStartPoint(startPoint);
    }
    if (targetAnchor) {
      const endPoint = {
        x: targetAnchor?.x,
        y: targetAnchor?.y,
      };
      this.updateEndPoint(endPoint);
    }
    // Need to clear the existing pointsList to trigger bezier auto-calculation of control points.
    this.pointsList = [];
    this.initPoints();
  }
}

export default {
  type: 'custom-bezier',
  view: CustomEdge,
  model: CustomEdgeModel,
};
