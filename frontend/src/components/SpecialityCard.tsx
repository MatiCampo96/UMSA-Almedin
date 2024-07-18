import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
} from "@mui/material";

interface SpecialityCardProps {
  specialities: string[];
  onSelectSpeciality: (speciality: string) => void;
}

const SpecialityCard: React.FC<SpecialityCardProps> = ({
  specialities,
  onSelectSpeciality,
}) => {
  const formatSpeciality = (
    speciality: string
  ): { formatted: string; value: string } => {
    const formatted = speciality
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());
    return { formatted, value: speciality };
  };

  const handleSelect = (value: string) => {
    onSelectSpeciality(value);
  };

  return (
    <Grid container spacing={2}>
      {specialities.map((speciality, index) => {
        const { formatted, value } = formatSpeciality(speciality);
        return (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, mb: 2, boxShadow: 3 }}>
              <CardActionArea onClick={() => handleSelect(value)}>
                <CardContent>
                  <Typography variant="h6">{formatted}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SpecialityCard;
