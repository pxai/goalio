export type GoalProps =  {
    id: string;
    title: string;
    content: string;
    permalink: string;
    proof: string;
    createdAt: Date;
    updatedAt: Date;
    public: boolean;
    owner?: UserProps;
    milestones?: MilestoneProps[];
    permissions?: PermissionProps[];
}

export type PermissionProps = {
    id: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    goal: GoalProps;
    user: UserProps;
}

export type MilestoneProps = {
    id: string;
    title: string;
    content: string;
    proof: string;
    createdAt: Date;
    updatedAt: Date;
    user?: UserProps;
    goal: GoalProps;
    tasks?: TaskProps[];
}

export type TaskProps = {
    id: string;
    title: string;
    content: string;
    proof: string;
    createdAt: Date;
    updatedAt: Date;
    user?: UserProps;
    milestone?: MilestoneProps;
}

export type UserProps =  {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    goals?: GoalProps[];
    milestones?: MilestoneProps[];
    tasks?: TaskProps[];
    permissions?: PermissionProps[];
}
