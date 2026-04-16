[Salon.drawio](https://github.com/user-attachments/files/26798140/Salon.drawio)
<mxfile host="app.diagrams.net" agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36" version="29.6.4">
  <diagram name="Page-1" id="FnO0Vz5tYaJEog56Wfb8">
    <mxGraphModel grid="1" page="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="hg4Dnpbp_WEDGjpdfEO4-1" parent="1" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;" value="Actor" vertex="1">
          <mxGeometry height="60" width="30" x="90" y="160" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-2" parent="1" style="whiteSpace=wrap;html=1;shape=mxgraph.basic.cloud_rect" value="API Gateway&lt;div&gt;- authentication &amp;amp; authorization&lt;/div&gt;&lt;div&gt;- rate limiting&lt;/div&gt;&lt;div&gt;- routing&lt;/div&gt;" vertex="1">
          <mxGeometry height="200" width="200" x="280" y="115" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-5" edge="1" parent="1" style="endArrow=open;endFill=1;endSize=12;html=1;rounded=0;" value="">
          <mxGeometry relative="1" width="160" as="geometry">
            <mxPoint x="120" y="200" as="sourcePoint" />
            <mxPoint x="280" y="200" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-7" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-2" style="endArrow=classic;html=1;rounded=0;exitX=0.986;exitY=0.064;exitDx=0;exitDy=0;exitPerimeter=0;entryX=-0.011;entryY=0.618;entryDx=0;entryDy=0;entryPerimeter=0;" target="SD1AZuPbht-V7l8974hM-10" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="720" y="170" as="sourcePoint" />
            <mxPoint x="1155" y="-20.019999999999982" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-9" parent="1" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.database;whiteSpace=wrap;" value="SQL WorkkBench" vertex="1">
          <mxGeometry height="80" width="110" x="1820" y="-170" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-10" parent="1" style="ellipse;whiteSpace=wrap;html=1;" value="User Service" vertex="1">
          <mxGeometry height="70" width="140" x="1150" y="-160" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-18" parent="1" style="ellipse;whiteSpace=wrap;html=1;" value="Salon Service" vertex="1">
          <mxGeometry height="70" width="140" x="1150" y="-10" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-19" parent="1" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.database;whiteSpace=wrap;" value="SQL WorkkBench" vertex="1">
          <mxGeometry height="80" width="110" x="1820" y="-30" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-22" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-2" style="endArrow=classic;html=1;rounded=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitX=1.003;exitY=0.164;exitDx=0;exitDy=0;exitPerimeter=0;" target="SD1AZuPbht-V7l8974hM-18" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="1100" y="20" as="sourcePoint" />
            <mxPoint x="1150" y="-30" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-24" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-18" style="endArrow=classic;startArrow=classic;html=1;rounded=0;exitX=1.003;exitY=0.416;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.003;entryY=0.427;entryDx=0;entryDy=0;entryPerimeter=0;" target="SD1AZuPbht-V7l8974hM-19" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="1420" y="60" as="sourcePoint" />
            <mxPoint x="1590" y="29" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-25" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-10" style="endArrow=classic;startArrow=classic;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;entryPerimeter=0;" target="SD1AZuPbht-V7l8974hM-9" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="1420" y="10" as="sourcePoint" />
            <mxPoint x="1470" y="-40" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-32" edge="1" parent="1" style="endArrow=open;endSize=12;dashed=1;html=1;rounded=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;" target="SD1AZuPbht-V7l8974hM-10" value="User - Owner&amp;nbsp;">
          <mxGeometry relative="1" width="160" as="geometry">
            <mxPoint x="1220" y="-10" as="sourcePoint" />
            <mxPoint x="1380" y="30" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-33" parent="1" style="ellipse;whiteSpace=wrap;html=1;" value="Category Service" vertex="1">
          <mxGeometry height="70" width="140" x="1160" y="110" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-34" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-2" style="endArrow=classic;html=1;rounded=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitX=1.007;exitY=0.334;exitDx=0;exitDy=0;exitPerimeter=0;" target="SD1AZuPbht-V7l8974hM-33" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="800" y="333" as="sourcePoint" />
            <mxPoint x="1469" y="240" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-35" parent="1" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.database;whiteSpace=wrap;" value="SQL WorkkBench" vertex="1">
          <mxGeometry height="80" width="110" x="1820" y="130" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-36" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-33" style="endArrow=classic;startArrow=classic;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=-0.016;entryY=0.309;entryDx=0;entryDy=0;entryPerimeter=0;" target="SD1AZuPbht-V7l8974hM-35" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <Array as="points" />
            <mxPoint x="1380" y="85" as="sourcePoint" />
            <mxPoint x="1690" y="70" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-37" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-18" style="endArrow=diamondThin;endFill=0;endSize=24;html=1;rounded=0;exitX=0.562;exitY=1.029;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" target="SD1AZuPbht-V7l8974hM-33" value="">
          <mxGeometry relative="1" width="160" as="geometry">
            <mxPoint x="1120" y="129.08999999999992" as="sourcePoint" />
            <mxPoint x="1121.76" y="80" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-38" parent="1" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;" value="Category - SalonId" vertex="1">
          <mxGeometry height="30" width="110" x="1100" y="60" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-39" parent="1" style="ellipse;whiteSpace=wrap;html=1;" value="Offering Service" vertex="1">
          <mxGeometry height="70" width="140" x="1160" y="315" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-40" parent="1" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.database;whiteSpace=wrap;" value="SQL WorkkBench" vertex="1">
          <mxGeometry height="80" width="110" x="1830" y="330" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-41" edge="1" parent="1" style="endArrow=classic;startArrow=classic;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0.016;entryY=0.266;entryDx=0;entryDy=0;entryPerimeter=0;" target="SD1AZuPbht-V7l8974hM-40" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <Array as="points" />
            <mxPoint x="1300" y="340" as="sourcePoint" />
            <mxPoint x="1588" y="330" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-42" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-2" style="endArrow=classic;html=1;rounded=0;entryX=0.019;entryY=0.359;entryDx=0;entryDy=0;entryPerimeter=0;exitX=1.019;exitY=0.447;exitDx=0;exitDy=0;exitPerimeter=0;" target="SD1AZuPbht-V7l8974hM-39" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="790" y="350" as="sourcePoint" />
            <mxPoint x="840" y="300" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-44" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-18" style="endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=0;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;rounded=0;exitX=0.929;exitY=0.837;exitDx=0;exitDy=0;exitPerimeter=0;" value="1">
          <mxGeometry relative="1" x="-1" y="3" as="geometry">
            <Array as="points">
              <mxPoint x="1330" y="49" />
              <mxPoint x="1330" y="300" />
              <mxPoint x="1290" y="300" />
            </Array>
            <mxPoint x="1298.8536585365796" y="48.631463414632925" as="sourcePoint" />
            <mxPoint x="1289.9997948556636" y="331.36000000000024" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-45" edge="1" parent="1" style="endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=0;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;rounded=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" target="SD1AZuPbht-V7l8974hM-39" value="1">
          <mxGeometry relative="1" x="-1" y="3" as="geometry">
            <Array as="points">
              <mxPoint x="1235" y="280" />
              <mxPoint x="1230" y="280" />
            </Array>
            <mxPoint x="1235" y="180" as="sourcePoint" />
            <mxPoint x="1230" y="320" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-47" parent="1" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;" value="CategoryId" vertex="1">
          <mxGeometry height="30" width="60" x="1240" y="220" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-48" parent="1" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;" value="SalonId" vertex="1">
          <mxGeometry height="30" width="60" x="1320" y="250" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-49" parent="1" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;" value="OfferingService" vertex="1">
          <mxGeometry height="206" width="130" x="1970" y="290" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-50" parent="SD1AZuPbht-V7l8974hM-49" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ Id: Long" vertex="1">
          <mxGeometry height="26" width="130" y="26" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-51" parent="SD1AZuPbht-V7l8974hM-49" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ name: String" vertex="1">
          <mxGeometry height="26" width="130" y="52" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-52" parent="SD1AZuPbht-V7l8974hM-49" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ description: String&lt;div&gt;&lt;br&gt;&lt;/div&gt;" vertex="1">
          <mxGeometry height="32" width="130" y="78" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-54" parent="SD1AZuPbht-V7l8974hM-49" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="&lt;div&gt;+ price: int&lt;/div&gt;" vertex="1">
          <mxGeometry height="32" width="130" y="110" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-55" parent="SD1AZuPbht-V7l8974hM-49" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="&lt;div&gt;+ duration: int&lt;/div&gt;" vertex="1">
          <mxGeometry height="32" width="130" y="142" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-56" parent="SD1AZuPbht-V7l8974hM-49" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="&lt;div&gt;+ image: String&lt;/div&gt;" vertex="1">
          <mxGeometry height="32" width="130" y="174" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-59" parent="1" style="ellipse;whiteSpace=wrap;html=1;" value="Booking Service" vertex="1">
          <mxGeometry height="70" width="140" x="1570" y="680" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-60" parent="1" style="ellipse;whiteSpace=wrap;html=1;" value="Payment Service" vertex="1">
          <mxGeometry height="70" width="140" x="1560" y="930" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-63" parent="1" style="rounded=1;whiteSpace=wrap;html=1;" value="Payment Gateway" vertex="1">
          <mxGeometry height="60" width="120" x="1580" y="1120" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-64" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-60" style="endArrow=open;endFill=1;endSize=12;html=1;rounded=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;exitX=0.571;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;" value="">
          <mxGeometry relative="1" width="160" as="geometry">
            <mxPoint x="1250" y="780" as="sourcePoint" />
            <mxPoint x="1640" y="1120" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-65" parent="1" style="ellipse;whiteSpace=wrap;html=1;" value="Notification Service" vertex="1">
          <mxGeometry height="70" width="140" x="2300" y="1160" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-66" parent="1" style="ellipse;whiteSpace=wrap;html=1;" value="Review Service" vertex="1">
          <mxGeometry height="70" width="140" x="1830" y="1250" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-67" parent="1" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;" value="Category" vertex="1">
          <mxGeometry height="130" width="140" x="1970" y="118" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-68" parent="SD1AZuPbht-V7l8974hM-67" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ id: Long" vertex="1">
          <mxGeometry height="26" width="140" y="26" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-69" parent="SD1AZuPbht-V7l8974hM-67" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ name: String" vertex="1">
          <mxGeometry height="26" width="140" y="52" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-70" parent="SD1AZuPbht-V7l8974hM-67" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ image: String" vertex="1">
          <mxGeometry height="26" width="140" y="78" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-71" parent="SD1AZuPbht-V7l8974hM-67" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ Long: salonId" vertex="1">
          <mxGeometry height="26" width="140" y="104" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-75" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-59" style="endArrow=block;startArrow=block;endFill=1;startFill=1;html=1;rounded=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;entryPerimeter=0;exitX=1.009;exitY=0.603;exitDx=0;exitDy=0;exitPerimeter=0;" target="SD1AZuPbht-V7l8974hM-76" value="">
          <mxGeometry relative="1" width="160" as="geometry">
            <mxPoint x="1320" y="490" as="sourcePoint" />
            <mxPoint x="1480" y="490" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-76" parent="1" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.database;whiteSpace=wrap;" value="SQL WorkkBench" vertex="1">
          <mxGeometry height="80" width="110" x="2140" y="680" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-79" edge="1" parent="1" style="endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=1;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;rounded=1;exitX=1;exitY=1;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;curved=0;" target="SD1AZuPbht-V7l8974hM-59" value="1">
          <mxGeometry relative="1" x="-1" y="3" as="geometry">
            <Array as="points">
              <mxPoint x="1240" y="716" />
              <mxPoint x="1570" y="716" />
            </Array>
            <mxPoint x="1240.007474683058" y="383.99873734152925" as="sourcePoint" />
            <mxPoint x="1531.07" y="716.4099999999999" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-80" edge="1" parent="1" style="endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=1;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;rounded=0;entryX=0.271;entryY=0.11;entryDx=0;entryDy=0;entryPerimeter=0;exitX=0.737;exitY=0.985;exitDx=0;exitDy=0;exitPerimeter=0;" value="1">
          <mxGeometry relative="1" x="-1" y="3" as="geometry">
            <Array as="points">
              <mxPoint x="1290" y="60" />
              <mxPoint x="1290" y="101" />
              <mxPoint x="1382" y="101" />
              <mxPoint x="1382" y="689" />
            </Array>
            <mxPoint x="1235.2399999999998" y="60.00000000000004" as="sourcePoint" />
            <mxPoint x="1590" y="688.7500000000002" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-81" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-10" style="endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=1;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;rounded=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;exitX=1;exitY=1;exitDx=0;exitDy=0;" target="SD1AZuPbht-V7l8974hM-59" value="1">
          <mxGeometry relative="1" x="-1" y="3" as="geometry">
            <Array as="points">
              <mxPoint x="1510" y="-100" />
              <mxPoint x="1510" y="550" />
              <mxPoint x="1640" y="550" />
            </Array>
            <mxPoint x="1510" y="880" as="sourcePoint" />
            <mxPoint x="1510" y="1340" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-82" parent="1" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;" value="Owner + Customer" vertex="1">
          <mxGeometry height="30" width="110" x="60" y="260" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-83" parent="1" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;" value="Booking" vertex="1">
          <mxGeometry height="234" width="190" x="2270" y="580" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-84" parent="SD1AZuPbht-V7l8974hM-83" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ id: Long" vertex="1">
          <mxGeometry height="26" width="190" y="26" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-85" parent="SD1AZuPbht-V7l8974hM-83" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ salonId: Long" vertex="1">
          <mxGeometry height="26" width="190" y="52" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-86" parent="SD1AZuPbht-V7l8974hM-83" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ customerId: Long" vertex="1">
          <mxGeometry height="26" width="190" y="78" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-98" parent="SD1AZuPbht-V7l8974hM-83" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ startTime: LocalDateTime" vertex="1">
          <mxGeometry height="26" width="190" y="104" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-99" parent="SD1AZuPbht-V7l8974hM-83" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ endTime: LocalDateTime" vertex="1">
          <mxGeometry height="26" width="190" y="130" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-107" parent="SD1AZuPbht-V7l8974hM-83" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ serviceIds: Set&amp;lt;Long&amp;gt;" vertex="1">
          <mxGeometry height="26" width="190" y="156" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-113" edge="1" parent="SD1AZuPbht-V7l8974hM-83" source="SD1AZuPbht-V7l8974hM-108" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="240.00000000000045" y="195.28571428571422" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-108" parent="SD1AZuPbht-V7l8974hM-83" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ bookingStatus: BookingStatus" vertex="1">
          <mxGeometry height="26" width="190" y="182" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-109" parent="SD1AZuPbht-V7l8974hM-83" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ totalPrice: int" vertex="1">
          <mxGeometry height="26" width="190" y="208" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-91" parent="1" style="rounded=0;whiteSpace=wrap;html=1;" value="BookingEventConsumer" vertex="1">
          <mxGeometry height="60" width="150" x="2280" y="920" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-92" parent="1" style="rounded=0;whiteSpace=wrap;html=1;" value="BookingEventProducer" vertex="1">
          <mxGeometry height="60" width="150" x="1830" y="920" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-95" parent="1" style="rounded=0;whiteSpace=wrap;html=1;" value="NotificationEventConsumer" vertex="1">
          <mxGeometry height="60" width="160" x="2280" y="1000" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-96" parent="1" style="rounded=0;whiteSpace=wrap;html=1;" value="NotificationEventProducer" vertex="1">
          <mxGeometry height="60" width="160" x="1830" y="1000" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-114" parent="1" style="ellipse;whiteSpace=wrap;html=1;" value="Enum" vertex="1">
          <mxGeometry height="50" width="80" x="2510" y="750" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-115" parent="1" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;" value="salonId" vertex="1">
          <mxGeometry height="30" width="60" x="1440" y="660" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-116" parent="1" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;" value="userId" vertex="1">
          <mxGeometry height="30" width="60" x="1650" y="640" as="geometry" />
        </mxCell>
        <mxCell id="SD1AZuPbht-V7l8974hM-117" parent="1" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;" value="ServiceIds" vertex="1">
          <mxGeometry height="30" width="60" x="1260" y="680" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-2" edge="1" parent="1" style="endArrow=none;html=1;rounded=0;" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="1290" y="-130" as="sourcePoint" />
            <mxPoint x="1340" y="-180" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-3" parent="1" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;" value="Authentication &amp;amp; Authorization" vertex="1">
          <mxGeometry height="30" width="60" x="1420" y="-215" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-4" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-60" style="endArrow=classic;startArrow=classic;html=1;rounded=0;exitX=0.559;exitY=-0.016;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;" target="SD1AZuPbht-V7l8974hM-59" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="1639.47" y="850" as="sourcePoint" />
            <mxPoint x="1640.53" y="758.81" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-6" parent="1" style="rhombus;whiteSpace=wrap;html=1;" value="Keycloak" vertex="1">
          <mxGeometry height="80" width="80" x="1320" y="-240" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-7" parent="1" style="rounded=1;whiteSpace=wrap;html=1;absoluteArcSize=1;arcSize=14;strokeWidth=2;" value="RabbitMQ" vertex="1">
          <mxGeometry height="60" width="100" x="2080" y="960" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-8" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-60" style="html=1;verticalAlign=bottom;endArrow=block;curved=0;rounded=0;exitX=0.985;exitY=0.652;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitPerimeter=0;" target="SD1AZuPbht-V7l8974hM-96" value="dispatch">
          <mxGeometry relative="1" width="80" as="geometry">
            <mxPoint x="1770" y="950" as="sourcePoint" />
            <mxPoint x="1870" y="950" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-11" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-60" style="html=1;verticalAlign=bottom;endArrow=block;curved=0;rounded=0;entryX=0.007;entryY=0.372;entryDx=0;entryDy=0;entryPerimeter=0;" target="SD1AZuPbht-V7l8974hM-92" value="dispatch">
          <mxGeometry relative="1" width="80" as="geometry">
            <mxPoint x="1750" y="1015" as="sourcePoint" />
            <mxPoint x="1890" y="990" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-13" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-96" style="endArrow=none;html=1;rounded=0;entryX=0;entryY=0.75;entryDx=0;entryDy=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" target="lEhgjA9h17sxyiH5vVO0-7" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="2120" y="1110" as="sourcePoint" />
            <mxPoint x="2170" y="1060" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-14" edge="1" parent="1" style="endArrow=none;html=1;rounded=0;entryX=0.011;entryY=0.373;entryDx=0;entryDy=0;entryPerimeter=0;" target="lEhgjA9h17sxyiH5vVO0-7" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="1983" y="957" as="sourcePoint" />
            <mxPoint x="2080" y="1005" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-15" edge="1" parent="1" source="lEhgjA9h17sxyiH5vVO0-7" style="endArrow=none;html=1;rounded=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitX=1.021;exitY=0.373;exitDx=0;exitDy=0;exitPerimeter=0;" target="SD1AZuPbht-V7l8974hM-91" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="2190" y="970" as="sourcePoint" />
            <mxPoint x="2288" y="995" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-16" edge="1" parent="1" source="lEhgjA9h17sxyiH5vVO0-7" style="endArrow=none;html=1;rounded=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitX=1;exitY=0.75;exitDx=0;exitDy=0;" target="SD1AZuPbht-V7l8974hM-95" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="2220" y="1045" as="sourcePoint" />
            <mxPoint x="2310" y="1020" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-17" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-95" style="endArrow=classic;html=1;rounded=0;entryX=0.439;entryY=0.052;entryDx=0;entryDy=0;entryPerimeter=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;" target="SD1AZuPbht-V7l8974hM-65" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="2361" y="1070" as="sourcePoint" />
            <mxPoint x="2410" y="1140" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-18" parent="1" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.database;whiteSpace=wrap;" value="SQL WorkkBench" vertex="1">
          <mxGeometry height="80" width="110" x="2730" y="1155" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-19" edge="1" parent="1" style="endArrow=block;startArrow=block;endFill=1;startFill=1;html=1;rounded=0;exitX=1.009;exitY=0.603;exitDx=0;exitDy=0;exitPerimeter=0;" value="">
          <mxGeometry relative="1" width="160" as="geometry">
            <mxPoint x="2440" y="1192" as="sourcePoint" />
            <mxPoint x="2730" y="1190" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-20" parent="1" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;" value="Create" vertex="1">
          <mxGeometry height="30" width="60" x="2360" y="1070" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-22" parent="1" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;" value="Payment Id&lt;div&gt;Payment Link Id&lt;/div&gt;" vertex="1">
          <mxGeometry height="30" width="100" x="1600" y="1190" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-23" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-63" style="endArrow=none;dashed=1;html=1;dashPattern=1 3;strokeWidth=2;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.85;entryDx=0;entryDy=0;entryPerimeter=0;" target="SD1AZuPbht-V7l8974hM-76" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <Array as="points">
              <mxPoint x="1830" y="1150" />
              <mxPoint x="2000" y="1130" />
            </Array>
            <mxPoint x="1500" y="1060" as="sourcePoint" />
            <mxPoint x="1560" y="740" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-25" parent="1" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;" value="Confirm Booking" vertex="1">
          <mxGeometry height="30" width="100" x="1790" y="1155" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-26" parent="1" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;" value="Notification" vertex="1">
          <mxGeometry height="206" width="160" x="2870" y="1140" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-27" parent="lEhgjA9h17sxyiH5vVO0-26" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ Id: Long" vertex="1">
          <mxGeometry height="26" width="160" y="26" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-28" parent="lEhgjA9h17sxyiH5vVO0-26" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ type: String" vertex="1">
          <mxGeometry height="26" width="160" y="52" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-29" parent="lEhgjA9h17sxyiH5vVO0-26" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ isRead: Boolean" vertex="1">
          <mxGeometry height="32" width="160" y="78" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-30" parent="lEhgjA9h17sxyiH5vVO0-26" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ userId: Long" vertex="1">
          <mxGeometry height="32" width="160" y="110" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-31" parent="lEhgjA9h17sxyiH5vVO0-26" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ salonId: Long" vertex="1">
          <mxGeometry height="32" width="160" y="142" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-32" parent="lEhgjA9h17sxyiH5vVO0-26" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;" value="+ createdAt: LocalDateTime" vertex="1">
          <mxGeometry height="32" width="160" y="174" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-33" edge="1" parent="1" source="SD1AZuPbht-V7l8974hM-91" style="endArrow=none;dashed=1;html=1;dashPattern=1 3;strokeWidth=2;rounded=0;entryX=0.636;entryY=1;entryDx=0;entryDy=0;entryPerimeter=0;exitX=0.328;exitY=0.02;exitDx=0;exitDy=0;exitPerimeter=0;" target="SD1AZuPbht-V7l8974hM-76" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="2190" y="910" as="sourcePoint" />
            <mxPoint x="2240" y="860" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-34" parent="1" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;" value="Booking Status" vertex="1">
          <mxGeometry height="30" width="90" x="2300" y="850" as="geometry" />
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-36" edge="1" parent="1" style="endArrow=none;html=1;rounded=0;" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="1150" y="360" as="sourcePoint" />
            <mxPoint x="1200" y="310" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-37" edge="1" parent="1" style="endArrow=none;dashed=1;html=1;rounded=0;" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="200" y="1610" as="sourcePoint" />
            <mxPoint x="200" y="-330" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-38" edge="1" parent="1" style="endArrow=none;dashed=1;html=1;rounded=0;" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="3150" y="-320" as="sourcePoint" />
            <mxPoint x="200" y="-320" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-39" edge="1" parent="1" style="endArrow=none;dashed=1;html=1;rounded=0;" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="3130" y="1590" as="sourcePoint" />
            <mxPoint x="3140" y="-310" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-40" edge="1" parent="1" style="endArrow=none;dashed=1;html=1;rounded=0;" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="190" y="1600" as="sourcePoint" />
            <mxPoint x="3130" y="1600" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-41" edge="1" parent="1" style="endArrow=classic;html=1;rounded=0;" value="">
          <mxGeometry height="50" relative="1" width="50" as="geometry">
            <mxPoint x="1140" y="1770" as="sourcePoint" />
            <mxPoint x="1150" y="1600" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lEhgjA9h17sxyiH5vVO0-43" parent="1" style="shape=ext;double=1;rounded=1;whiteSpace=wrap;html=1;" value="Eureka Server" vertex="1">
          <mxGeometry height="80" width="120" x="1080" y="1770" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
