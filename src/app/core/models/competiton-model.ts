export interface CreateCompetition {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
}

export interface CompetitionResponse{
    competitionId: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
}
