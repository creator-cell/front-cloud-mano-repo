export interface Job {
    id: string;
    isTrash: boolean;
    status: "ACTIVE" | "INACTIVE" | "CLOSED";
    position: string;
    companyName: string;
    location?: string;
    experience?: string;
    ctc?: string;
    noticePeriod?: string;
    applyBefore?: boolean;
    hiringStatus?: "OPEN" | "CLOSED" | "ON_HOLD";
    minQualification: string;
    prefQualification?: string;
    aboutJob: string;
    responsibilities: string[];
    majorSkills: string[];
    jobType: "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "CONTRACT";
    employmentType: "PERMANENT" | "TEMPORARY" | "FREELANCE";
    remote: boolean;
    industry: string;
    benefits?: string;
    numberOfOpenings: number;
    contactEmail?: string;
    contactPhone?: string;
    jobPostedDate: Date;
    salaryRange?: SalaryRange;
    workHours?: string;
    perks?: string;
    likesCount: number;
    dislikesCount: number;
    applicationsCount: number;
    createdAt: string;
}


interface SalaryRange {
    minSalary: number;
    maxSalary: number;
}

export interface JobApplication {
    id: string;
    isTrash: boolean;
    status: string;
    jobId: string;
    applicantId: string;
    appliedAt: string;
    updatedAt: string;
    Job: Job;
    applicationCount: number;
}
