export interface PrintTemplateModel{
    _id?:string,
    Id?: string,
    TemplateName?: string,
    Creator?: string,
    CreateDate?: Date,
    HeadMessage?: string,
    BottomMessage?: string,
    IsDefault?: Boolean,
    OrgId?: string,
    IsDel?: Boolean,
    HeadType?: number,
    TemplateType?: number,
    HeadFontSize?: number,
    IsNote?:Boolean
}