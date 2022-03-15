import { Case } from "./Case"
import case1 from '../../assets/cases/case_1.png'
import case2 from '../../assets/cases/case_2.png'
import case3 from '../../assets/cases/case_3.png'

const t = [case1, case2, case3, case1, case2, case3, case1, case2, case3, case1]

export const CaseList = () => {
    return (
        <div className="flex flex-wrap gap-10 mt-10">
            {t.map((item, i) => (
                <Case key={i} image={item} />
            ))}
        </div>
    )
}