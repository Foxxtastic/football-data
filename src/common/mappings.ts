import { Competition } from "../api";

export const mapCompetition = (item: Competition) => ({
    id: item.id,
    name: `${item.name} - ${item.area.name}`
});