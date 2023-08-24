import { FC, ReactElement } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { SchemaAttribute } from "../../utils/schemaUtils";


interface CardItem {
  [key: string]: any[]; // Allow for dynamic Data
}


type props = {
  cardData?: CardItem[]; // data
  schemaData?: SchemaAttribute[]; // schema attributes
};

const CSCard: FC<props> = ({ schemaData, cardData }): ReactElement => {
  return (
     <div>
        <Grid
         container
         spacing={2}
         style={{ marginLeft: "2rem", marginRight: "2rem" }}
        >
        {cardData?.map((card: CardItem, index: number) => (
          <Grid lg={3} xs={12} md={3} key={index}>
            <Card key={index}>
              {schemaData?.map(
                (schema: SchemaAttribute, i: Number) =>
                  schema?.cardView && (
                    <CardContent key={`${index}-${i}`}>
                      <Typography sx={{ fontSize: 13 }} variant="body2">
                        <b>{schema.name} :</b> {card[schema.key || ''] }
                      </Typography>
                    </CardContent>
                  )
              )}
            </Card>
          </Grid>
           ))}
        </Grid>
     
    </div>
  );
};

export default CSCard;
