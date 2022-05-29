import { Result } from "../../../../../core/config/result";
import { SubjectKind } from "../../../entries/domain/models/Entry";
import { newSubjectAvailableHours, SubjectAvailableHours } from "../../domain/models/SubjectAvailableHours";
import { degreeAvailableHoursData } from "../data_sources/http/AvailableHours.data";
import AvailableHoursParamsDTO from "../dto/AvailableHoursParamsDTO";
import SubjectAvailableHoursDTO from "../dto/SubjectAvailableHoursDTO";

export const degreeAvailableHoursRepo = {
  getDegreeAvailableHours: async (
    params: AvailableHoursParamsDTO
  ): Promise<Result<SubjectAvailableHours[]>> => {
    const res = await degreeAvailableHoursData.getDegreeAvailableHours(params);
    if (res.isError) {
      return { isError: true, error: res.error };
    }
    // Parse to domain models, where bussines logic can understand the data
    try {
      const fillHours=(availabeHour:SubjectAvailableHours,dto:SubjectAvailableHoursDTO):SubjectAvailableHours=>{

        switch (dto.Subject.Kind) {

          case SubjectKind.theory:
            availabeHour.theory.remaining = dto.RemainingHours
            availabeHour.theory.total =dto.MaxHours
            //add minutes
            break;
          case SubjectKind.problems:
            availabeHour.exercises.remaining = dto.RemainingHours
            availabeHour.exercises.total =dto.MaxHours
            
            break;
          case SubjectKind.practices:
            availabeHour.practice.remaining = dto.RemainingHours
            availabeHour.practice.total =dto.MaxHours
            
            break;
              
        
          default:
            break;

        }
          return availabeHour

      }

      var availableHours:SubjectAvailableHours[] = []
      var lastSubject = ""
      res.value.forEach( hour => {
        //Si la asignatura es nueva
        if(lastSubject!=hour.Subject.Name){
          lastSubject= hour.Subject.Name
          const avHour = fillHours(newSubjectAvailableHours(lastSubject),hour)
          availableHours.push(avHour)
  
          
        }
        else {
          const subject = availableHours.pop()!
          const avHour = fillHours(subject,hour)
          availableHours.push(avHour)
         


        }
          
        });

      return {
        isError: false,
        value: availableHours,
      };
    } catch (e) {
      console.error((e as Error).message);
      return {
        isError: true,
        error: e as Error,
      };
    }
  },
};
