
import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle2, Clock, User, Sparkles, Eye, ChevronDown, ChevronUp, ArrowLeft, FileText, Link2, MessageSquare, Edit3, Plus, ExternalLink, X, ImageIcon, Tag, Send } from 'lucide-react'
import { Badge } from '../components/research/common/StatusBadge'
import { Button } from '../components/MainButton'
import { Card } from '../components/database/perfumeDetails/card'
import dayjs from 'dayjs'
import relatveTime from "dayjs/plugin/relativeTime"
import NewEditCard from '../components/research/common/NewEditCard'
import EditCardMultipleValues from '../components/research/common/EditCardMultipleValues'
import EditCardMultipleValuesOther from '../components/research/common/EditCardMultipleValuesOther'
import ToggleEditCard from '../components/research/common/ToggleEditCard'


const mockEdits = [
  {
    id: '1',
    user: {
      username: 'Segel',
      avatar: '/placeholder.svg?height=40&width=40',
      isAuditor: true
    },
    editedAt: '2025-01-18T13:08:00Z',
    field: 'TOP NOTES',
    oldValue: 'Zypresse',
    newValue: 'Zypresse, krautige Noten',
    subEdits: [
      {
        user: 'Segel',
        editedAt: '2025-01-17T14:00:00Z',
        oldValue: '',
        newValue: 'Zypresse'
      }
    ]
  },
  {
    id: '2',
    user: {
      username: 'Segel',
      avatar: '/placeholder.svg?height=40&width=40',
      isAuditor: true
    },
    editedAt: '2025-01-17T14:00:00Z',
    field: 'HEART NOTES',
    oldValue: '',
    newValue: 'Amber'
  },
  {
    id: '3',
    user: {
      username: 'Segel',
      avatar: '/placeholder.svg?height=40&width=40',
      isAuditor: true
    },
    editedAt: '2025-01-17T14:00:00Z',
    field: 'BASE NOTES',
    oldValue: '',
    newValue: 'Vetiver'
  },
  {
    id: '4',
    user: {
      username: 'Segel',
      avatar: '/placeholder.svg?height=40&width=40',
      isAuditor: true
    },
    editedAt: '2025-01-17T14:00:00Z',
    field: 'FRAGRANCE NOTES',
    oldValue: 'Amber, Zypresse, Vetiver',
    newValue: '',
    isRemoved: true,
    subEdits: [
      {
        user: 'Segel',
        editedAt: '2025-01-17T14:00:00Z',
        oldValue: '',
        newValue: 'Amber, Zypresse, Vetiver'
      }
    ]
  },
  {
    id: '5',
    user: {
      username: 'Segel',
      avatar: '/placeholder.svg?height=40&width=40',
      isAuditor: true
    },
    editedAt: '2025-01-17T14:00:00Z',
    field: 'YEAR OF RELEASE',
    oldValue: '2024',
    newValue: '2025'
  }
]

function getTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  
  if (diffInDays === 0) return 'today'
  if (diffInDays === 1) return '1 day ago'
  return `${diffInDays} days ago`
}

export default function ViewProposedPerfumeEdits({originalData, editedInfo}) {

    console.log(originalData)
    console.log(editedInfo)

    //-- Text Fields --\\
    const [editedPerfumeIdx, setEditedPerfumeIdx] = useState(null)
    const [subEditsPerfume, setSubEditsPerfume] = useState([])

    const [editedParentCompanyIdx, setEditedParentCompanyIdx] = useState(null)
    const [subEditsParentCompany, setSubEditsParentCompany] = useState([])

    const [editedParentCompanyOtherIdx, setEditedParentCompanyOtherIdx] = useState(null)
    const [subEditsParentCompanyOther, setSubEditsParentCompanyOther] = useState([])

    const [editedCollectionIdx, setEditedCollectionIdx] = useState(null)
    const [subEditsCollection, setSubEditsCollection] = useState([])

    const [editedAvailabilityIdx, setEditedAvailabilityIdx] = useState(null)
    const [subEditsAvailability, setSubEditsAvailability] = useState([])

    const [editedVarientIdx, setEditedVarientIdx] = useState(null)
    const [subEditsVarient, setSubEditsVarient] = useState([])

    const [editedLimitedIdx, setEditedLimitedIdx] = useState(null)
    const [subEditsLimited, setSubEditsLimited] = useState([])

    const [editedVarientOGFragranceIdx, setEditedVarientOGFragranceIdx] = useState(null)
    const [subEditsVarientOGFragrance, setSubEditsVarientOGFragrance] = useState([])

    const [editedLimitedOGFragranceIdx, setEditedLimitedOGFragranceIdx] = useState(null)
    const [subEditsLimitedOGFragrance, setSubEditsLimitedOGFragrance] = useState([])

    const [editedCollectorsIdx, setEditedCollectorsIdx] = useState(null)
    const [subEditsCollectors, setSubEditsCollectors] = useState([])

    const [editedCollectorsOGFragranceIdx, setEditedCollectorsOGFragranceIdx] = useState(null)
    const [subEditsCollectorsOGFragrance, setSubEditsCollectorsOGFragrance] = useState([])

    const [editedGenderIdx, setEditedGenderIdx] = useState(null)
    const [subEditsGender, setSubEditsGender] = useState([])

    const [editedReleaseYearIdx, setEditedReleaseYearIdx] = useState(null)
    const [subEditsReleaseYear, setSubEditsReleaseYear] = useState([])

    const [editedBrandIdx, setEditedBrandIdx] = useState(null)
    const [subEditsBrand, setSubEditsBrand] = useState([])

    const [editedBrandOtherIdx, setEditedBrandOtherIdx] = useState(null)
    const [subEditsBrandOther, setSubEditsBrandOther] = useState([])

    const [editedCollectionOtherIdx, setEditedCollectionOtherIdx] = useState(null)
    const [subEditsCollectionOther, setSubEditsCollectionOther] = useState([])

    const [editedPerfumerIdx, setEditedPerfumerIdx] = useState(null)
    const [subEditsPerfumer, setSubEditsPerfumer] = useState([])

    const [editedPerfumerOtherIdx, setEditedPerfumerOtherIdx] = useState(null)
    const [subEditsPerfumerOther, setSubEditsPerfumerOther] = useState([])

    const [editedDesignerIdx, setEditedDesignerIdx] = useState(null)
    const [subEditsDesigner, setSubEditsDesigner] = useState([])

    const [editedDesignerOtherIdx, setEditedDesignerOtherIdx] = useState(null)
    const [subEditsDesignerOther, setSubEditsDesignerOther] = useState([])

    const [editedNotesIdx, setEditedNotesIdx] = useState(null)
    const [subEditsNotes, setSubEditsNotes] = useState([])

    dayjs.extend(relatveTime)
  
    const checkFragranceNameEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (edit.perfume !== originalData.perfume){
              setEditedPerfumeIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.perfume !== editedInfo[idxHolder].perfume){
              setSubEditsPerfume(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.perfume !== originalData.perfume){
              setEditedPerfumeIdx(idx)
            idxHolder = idx
            }
            
          }
        })
      }
    }
    
    const checkFragranceBrandEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          console.log(edit)
          console.log(originalData.brand?.name)
          if (idx < 1){
            
            if (edit.brand?.name !== originalData.brand?.name){
              setEditedBrandIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.brand?.name !== editedInfo[idxHolder].brand?.name){
              setSubEditsBrand(prev => [...prev, edit])
              idxHolder = idx
            }
            
          }else if (idx > 0 && idxHolder === null){
            if (edit.brand?.name !== originalData.brand?.name){
              setEditedBrandIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceBrandOtherEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          console.log(edit)
          console.log(originalData.brand_other?.name)
          // if (idx < 1 && originalData.brand_other?.name === null && edit.brand_other?.name)
          if (idx < 1){
            
            if (edit.brand_other !== originalData.brand_other){
              console.log('got to here 1')
              setEditedBrandOtherIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.brand_other !== editedInfo[idxHolder].brand_other){
              console.log('got to here 2')
              setSubEditsBrandOther(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.brand_other !== originalData.brand_other){
              console.log('got to here 3')
              setEditedBrandOtherIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceCollectionEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          console.log(edit)
          console.log(originalData.fragrance_collection?.name ?? null)
          console.log(idx)
          if (idx < 1){

            if (edit.fragrance_collection?.name !== originalData.fragrance_collection?.name){
              console.log('Got to here on collection 1')
              setEditedCollectionIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.fragrance_collection?.name !== editedInfo[idxHolder].fragrance_collection?.name ){
              console.log('Got to here on collection 2')
              setSubEditsCollection(prev => [...prev, edit])
              idxHolder = idx
            }
            
          }else if (idx > 0 && idxHolder === null){
            if (edit.fragrance_collection?.name !== originalData.fragrance_collection?.name){
              console.log('Got to here on collection 3')
              setEditedCollectionIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceCollectionOtherEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (edit.fragrance_collection_other !== originalData.fragrance_collection_other){
              setEditedCollectionOtherIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.fragrance_collection_other !== editedInfo[idxHolder].fragrance_collection_other){
              setSubEditsCollectionOther(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.fragrance_collection_other !== originalData.fragrance_collection_other){
              setEditedCollectionOtherIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceParentCompanyEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (edit.parent_company !== originalData.parent_company){
              setEditedParentCompanyIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.parent_company !== editedInfo[idxHolder].parent_company){
              setSubEditsParentCompany(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.parent_company !== originalData.parent_company){
              setEditedParentCompanyIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceParentCompanyOtherEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            
            if (edit.parent_company_other !== originalData.parent_company_other){
              setEditedParentCompanyOtherIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.parent_company_other !== editedInfo[idxHolder].parent_company_other){
              setSubEditsParentCompanyOther(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.parent_company_other !== originalData.parent_company_other){
              setEditedParentCompanyOtherIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceReleaseYearEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (String(edit.release_year) !== String(originalData.release_year)){
              setEditedReleaseYearIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (String(edit.release_year) !== String(editedInfo[idxHolder].release_year)){
              setSubEditsReleaseYear(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (String(edit.release_year) !== String(originalData.release_year)){
              setEditedReleaseYearIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceGenderEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (edit.gender !== originalData.gender){
              setEditedGenderIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.gender !== editedInfo[idxHolder].gender){
              setSubEditsGender(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.gender !== originalData.gender){
              setEditedGenderIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceAvalibilityEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (edit.availability !== originalData.availability){
              setEditedAvailabilityIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.availability !== editedInfo[idxHolder].availability){
              setSubEditsAvailability(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.availability !== originalData.availability){
              setEditedAvailabilityIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceVarientEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (edit.is_varient !== originalData.is_varient){
              setEditedVarientIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.is_varient !== editedInfo[idxHolder].is_varient){
              setSubEditsVarient(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.is_varient !== originalData.is_varient){
              setEditedVarientIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceVarientOGFragranceEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (edit.varient_original_perfume !== originalData.varient_original_perfume){
              setEditedVarientOGFragranceIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.varient_original_perfume !== editedInfo[idxHolder].varient_original_perfume){
              setSubEditsVarientOGFragrance(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.varient_original_perfume !== originalData.varient_original_perfume){
              setEditedVarientOGFragranceIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceLimitedEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (edit.is_limited !== originalData.is_limited){
              setEditedLimitedIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.is_limited !== editedInfo[idxHolder].is_limited){
              setSubEditsLimited(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.is_limited !== originalData.is_limited){
              setEditedLimitedIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceLimitedOGFragranceEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (edit.limited_original_perfume !== originalData.limited_original_perfume){
              setEditedLimitedOGFragranceIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.limited_original_perfume !== editedInfo[idxHolder].limited_original_perfume){
              setSubEditsLimitedOGFragrance(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.limited_original_perfume !== originalData.limited_original_perfume){
              setEditedLimitedOGFragranceIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceCollectorsEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (edit.is_collectors !== originalData.is_collectors){
              setEditedCollectorsIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.is_collectors !== editedInfo[idxHolder].is_collectors){
              setSubEditsCollectors(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.is_collectors !== originalData.is_collectors){
              setEditedCollectorsIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragranceCollectorsOGFragranceEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (edit.collectors_original_perfume !== originalData.collectors_original_perfume){
              setEditedCollectorsOGFragranceIdx(idx)
              idxHolder = idx
            }
          }else if(idx > 0 && idxHolder !== null){
            if (edit.collectors_original_perfume !== editedInfo[idxHolder].collectors_original_perfume){
              setSubEditsCollectorsOGFragrance(prev => [...prev, edit])
              idxHolder = idx
            }
          }else if (idx > 0 && idxHolder === null){
            if (edit.collectors_original_perfume !== originalData.collectors_original_perfume){
              setEditedCollectorsOGFragranceIdx(idx)
              idxHolder = idx
            }
            
          }
        })
      }
    }

    const checkFragrancePerfumerEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          // console.log(edit)
          // console.log(originalData.perfumers)
          console.log(idx)
          if (idx < 1){
            // console.log('go to less than 1')
            const ogInfo = new Map(originalData.perfumers.map((p => [p.id, p])));
            const editInfo = new Map(edit.perfumers.map((p => [p.id, p])));

            const removedPerfumers = originalData.perfumers.filter(p => !editInfo.has(p.id))
            const addedPerfumers = edit.perfumers.filter(p => !ogInfo.has(p.id))

            console.log(removedPerfumers)
            console.log(addedPerfumers)

            if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
              console.log('got to for to set edit data')
              setEditedPerfumerIdx(idx)
              idxHolder = idx
            }

          }else if(idx > 0 && idxHolder !== null){
            const pastEditInfo  = new Map(editedInfo[idxHolder].perfumers.map((p => [p.id, p])))
            // console.log(editedInfo[idxHolder])
            // console.log(idxHolder)
            const newEditInfo = new Map(edit.perfumers.map((p => [p.id, p])))

            // console.log(pastEditInfo)
            // console.log(newEditInfo)
            // console.log('Logged past and new')

            const removedPerfumers = editedInfo[idxHolder].perfumers.filter(p => !newEditInfo.has(p.id))
            const addedPerfumers = edit.perfumers.filter(p => !pastEditInfo.has(p.id))

            // console.log(removedPerfumers)
            // console.log(addedPerfumers)
            // console.log(edit)
            // console.log('logged removed and added')
            if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
              // console.log('ran sub edits')
              setSubEditsPerfumer(prev => [...prev, edit])
              idxHolder = idx
              // console.log(subEditsPerfumer)
              // idxHolder = idx
            }

          }else if (idx > 0 && idxHolder === null){
            // console.log('Got to here to log edit')
            console.log('Got to set idx')
            const ogInfo = new Map(originalData.perfumers.map((p => [p.id, p])));
            const editInfo = new Map(edit.perfumers.map((p => [p.id, p])));

            const removedPerfumers = originalData.perfumers.filter(p => !editInfo.has(p.id))
            const addedPerfumers = edit.perfumers.filter(p => !ogInfo.has(p.id))

            console.log(removedPerfumers)
            console.log(addedPerfumers)

            if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
              console.log('got to for to set edit data')
              setEditedPerfumerIdx(idx)
              idxHolder = idx
            }
            // setEditedPerfumerIdx(idx)
            // idxHolder = idx
          }
        })
      }
    }

    const checkFragrancePerfumerOtherEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          // console.log(edit)
          // console.log(originalData.perfumers)
          console.log(idx)
          if (idx < 1){
            // console.log('go to less than 1')
            const ogInfo = new Map(originalData.perfumers_other.map((p => [p.id, p])));
            const editInfo = new Map(edit.perfumers_other.map((p => [p.id, p])));

            const removedPerfumers = originalData.perfumers_other.filter(p => !editInfo.has(p.id))
            const addedPerfumers = edit.perfumers_other.filter(p => !ogInfo.has(p.id))

            console.log(removedPerfumers)
            console.log(addedPerfumers)

            if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
              console.log('got to for to set edit data')
              setEditedPerfumerOtherIdx(idx)
              idxHolder = idx
            }

          }else if(idx > 0 && idxHolder !== null){
            const pastEditInfo  = new Map(editedInfo[idxHolder].perfumers_other.map((p => [p.id, p])))
            // console.log(editedInfo[idxHolder])
            // console.log(idxHolder)
            const newEditInfo = new Map(edit.perfumers_other.map((p => [p.id, p])))

            // console.log(pastEditInfo)
            // console.log(newEditInfo)
            // console.log('Logged past and new')

            const removedPerfumers = editedInfo[idxHolder].perfumers_other.filter(p => !newEditInfo.has(p.id))
            const addedPerfumers = edit.perfumers_other.filter(p => !pastEditInfo.has(p.id))

            // console.log(removedPerfumers)
            // console.log(addedPerfumers)
            // console.log(edit)
            // console.log('logged removed and added')
            if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
              // console.log('ran sub edits')
              setSubEditsPerfumerOther(prev => [...prev, edit])
              idxHolder = idx
              // console.log(subEditsPerfumer)
              // idxHolder = idx
            }

          }else if (idx > 0 && idxHolder === null){
            // console.log('Got to here to log edit')
            console.log('Got to set idx')
            const ogInfo = new Map(originalData.perfumers_other.map((p => [p.id, p])));
            const editInfo = new Map(edit.perfumers_other.map((p => [p.id, p])));

            const removedPerfumers = originalData.perfumers_other.filter(p => !editInfo.has(p.id))
            const addedPerfumers = edit.perfumers_other.filter(p => !ogInfo.has(p.id))

            console.log(removedPerfumers)
            console.log(addedPerfumers)

            if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
              console.log('got to for to set edit data')
              setEditedPerfumerOtherIdx(idx)
              idxHolder = idx
            }
            // setEditedPerfumerIdx(idx)
            // idxHolder = idx
          }
        })
      }
    }

    const checkFragranceDesignerEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            const ogInfo = new Map(originalData.bottle_designer.map((p => [p.id, p])));
            const editInfo = new Map(edit.bottle_designer.map((p => [p.id, p])));

            const removedPerfumers = originalData.bottle_designer.filter(p => !editInfo.has(p.id))
            const addedPerfumers = edit.bottle_designer.filter(p => !ogInfo.has(p.id))

            if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
              setEditedDesignerIdx(idx)
              idxHolder = idx
            }

          }else if(idx > 0 && idxHolder !== null){
            const pastEditInfo  = new Map(editedInfo[idxHolder].bottle_designer.map((p => [p.id, p])))
            const newEditInfo = new Map(edit.bottle_designer.map((p => [p.id, p])))

            const removedPerfumers = editedInfo[idxHolder].bottle_designer.filter(p => !newEditInfo.has(p.id))
            const addedPerfumers = edit.bottle_designer.filter(p => !pastEditInfo.has(p.id))

            if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
              setSubEditsDesigner(prev => [...prev, edit])
              idxHolder = idx
            }

          }else if (idx > 0 && idxHolder === null){
            const ogInfo = new Map(originalData.bottle_designer.map((p => [p.id, p])));
            const editInfo = new Map(edit.bottle_designer.map((p => [p.id, p])));

            const removedPerfumers = originalData.bottle_designer.filter(p => !editInfo.has(p.id))
            const addedPerfumers = edit.bottle_designer.filter(p => !ogInfo.has(p.id))


            if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
              setEditedDesignerIdx(idx)
              idxHolder = idx
            }

          }
        })
      }
    }

    const checkFragranceDesignerOtherEdits = () => {
      let idxHolder = null
      if(editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            const ogInfo = new Map(originalData.bottle_designer_other.map((p => [p.id, p])));
            const editInfo = new Map(edit.bottle_designer_other.map((p => [p.id, p])));

            const removedPerfumers = originalData.bottle_designer_other.filter(p => !editInfo.has(p.id))
            const addedPerfumers = edit.bottle_designer_other.filter(p => !ogInfo.has(p.id))

            if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
              setEditedDesignerOtherIdx(idx)
              idxHolder = idx
            }

          }else if(idx > 0 && idxHolder !== null){
            const pastEditInfo  = new Map(editedInfo[idxHolder].bottle_designer_other.map((p => [p.id, p])))

            const newEditInfo = new Map(edit.bottle_designer_other.map((p => [p.id, p])))

            const removedPerfumers = editedInfo[idxHolder].bottle_designer_other.filter(p => !newEditInfo.has(p.id))
            const addedPerfumers = edit.bottle_designer_other.filter(p => !pastEditInfo.has(p.id))

            if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
              setSubEditsDesignerOther(prev => [...prev, edit])
              idxHolder = idx
            }

          }else if (idx > 0 && idxHolder === null){
            const ogInfo = new Map(originalData.bottle_designer_other.map((p => [p.id, p])));
            const editInfo = new Map(edit.bottle_designer_other.map((p => [p.id, p])));

            const removedPerfumers = originalData.bottle_designer_other.filter(p => !editInfo.has(p.id))
            const addedPerfumers = edit.bottle_designer_other.filter(p => !ogInfo.has(p.id))

            if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
              setEditedDesignerOtherIdx(idx)
              idxHolder = idx
            }

          }
        })
      }
    }

    const checkFragranceNotesEdits = () => {
       let idxHolder = null
       if (editedInfo){
        editedInfo.forEach((edit, idx) => {
          if (idx < 1){
            if (originalData.notes?.linear && edit.notes?.linear){
              const ogInfo = originalData.notes.linear;
              const editInfo = edit.notes.linear;
              console.log(ogInfo)
              console.log(editInfo)
              const removedPerfumers = originalData.notes.linear.filter(p => !editInfo.includes(p.id))
              const addedPerfumers = edit.notes.linear.filter(p => !ogInfo.includes(p.id))
              console.log(removedPerfumers)
              console.log(addedPerfumers)
              if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
                // setEditedDesignerOtherIdx(idx)
                setEditedNotesIdx(idx)
                idxHolder = idx
              }
            }else if (originalData.notes?.linear && edit.notes?.heart){
              console.log('got to here')
            }
            
          }else if (idx > 0 && idxHolder !== null){
            if (editedInfo[idxHolder].notes?.linear && edit.notes?.linear){
              const pastEditInfo  = editedInfo[idxHolder].notes?.linear

              const newEditInfo = edit.notes?.linear

              const removedPerfumers = editedInfo[idxHolder].notes.linear.filter(p => !newEditInfo.includes(p.id))
              const addedPerfumers = edit.notes.linear.filter(p => !pastEditInfo.includes(p.id))
              
              console.log(removedPerfumers)
              console.log(addedPerfumers)

              if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
                setSubEditsNotes(prev => [...prev, edit])
                idxHolder = idx
              }
            }else if (editedInfo[idxHolder].notes?.linear && edit.notes?.heart || editedInfo[idxHolder].notes?.heart && edit.notes?.linear){
              console.log('got to diff sub edits')
            }
          }else if (idx > 0 && idxHolder === null){
            if (originalData.notes?.linear && edit.notes?.linear){
              const ogInfo = originalData.notes?.linear
              const editInfo = edit.notes?.linear

              const removedPerfumers = originalData.notes.linear.filter(p => !editInfo.has(p.id))
              const addedPerfumers = edit.notes.linear.filter(p => !ogInfo.has(p.id))
              console.log('Got to last if')
              console.log(removedPerfumers)
              console.log(addedPerfumers)

              if (removedPerfumers.length > 0 || addedPerfumers.length > 0){
                setEditedNotesIdx(idx)
                idxHolder = idx
              }
            }
          }
        })
       }
    }

    useEffect(() => {
      checkFragranceNameEdits()
      checkFragranceBrandEdits()
      checkFragranceBrandOtherEdits()
      checkFragrancePerfumerEdits()
      checkFragranceParentCompanyEdits()
      checkFragranceReleaseYearEdits()
      checkFragranceGenderEdits()
      checkFragrancePerfumerOtherEdits()
      checkFragranceParentCompanyOtherEdits()
      checkFragranceDesignerEdits()
      checkFragranceDesignerOtherEdits()
      checkFragranceAvalibilityEdits()
      checkFragranceVarientEdits()
      checkFragranceVarientOGFragranceEdits()
      checkFragranceLimitedEdits()
      checkFragranceLimitedOGFragranceEdits()
      checkFragranceCollectorsEdits()
      checkFragranceCollectorsOGFragranceEdits()
      checkFragranceCollectionEdits()
      checkFragranceCollectionOtherEdits()
      checkFragranceNotesEdits()
    }, [editedInfo])

    console.log(subEditsPerfume)

    console.log(subEditsPerfumer)

    return (

        <div className="space-y-6 animate-fade-in">
                {/* Edits Header */}
                <Card className="p-6 bg-gradient-to-r from-pink-500/10 to-transparent dark:from-pink-500/5 border-pink-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      {editedInfo
                        ? 
                          <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
                            EDITS <span className="text-pink-600 dark:text-pink-400">{editedInfo.length}</span>
                          </h2>
                        : 
                          <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
                            EDITS <span className="text-pink-600 dark:text-pink-400">0</span>
                          </h2>
                      
                      }
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Changes made by research auditors to improve this proposal
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Edits List */}

               
                <div className="space-y-4">

                  {editedNotesIdx !== null
                    ? <EditCardMultipleValues editedIdx={editedNotesIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsNotes} field="Fragrance Notes" dataField={'notes'}
                      />
                    : null
                  }

                  {editedPerfumeIdx !== null
                    ? <NewEditCard editedIdx={editedPerfumeIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsPerfume} field="Perfume" dataField={'perfume'}
                      />
                    : null
                  }

                  {editedBrandIdx !== null
                    ? <NewEditCard editedIdx={editedBrandIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsBrand} field="Brand" dataField={'brand'}
                      />
                    : null
                  }

                  {editedCollectionIdx !== null
                    ? <NewEditCard editedIdx={editedCollectionIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsCollection} field="Fragrance Collection" dataField={'fragrance_collection'}
                      />
                    : null
                  }

                  {editedParentCompanyIdx !== null
                    ? <NewEditCard editedIdx={editedParentCompanyIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsParentCompany} field="Parent Company" dataField={'parent_company'}
                      />
                    : null
                  }

                  {editedParentCompanyOtherIdx !== null
                    ? <NewEditCard editedIdx={editedParentCompanyOtherIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsParentCompanyOther} field="Custom Parent Company" dataField={'parent_company_other'}
                      />
                    : null
                  }

                  {editedReleaseYearIdx !== null
                    ? <NewEditCard editedIdx={editedReleaseYearIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsReleaseYear} field="Release Year" dataField={'release_year'}
                      />
                    : null
                  }

                  {editedGenderIdx !== null
                    ? <NewEditCard editedIdx={editedGenderIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsGender} field="Gender" dataField={'gender'}
                      />
                    : null
                  }

                  {editedBrandOtherIdx !== null
                    ? <NewEditCard editedIdx={editedBrandOtherIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsBrandOther} field="Custom Brand" dataField={'brand_other'}
                      />
                    : null
                  }

                  {editedCollectionOtherIdx !== null
                    ? <NewEditCard editedIdx={editedCollectionOtherIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsCollectionOther} field="Custom Fragrance Collection" dataField={'fragrance_collection_other'}
                      />
                    : null
                  }

                  {editedAvailabilityIdx !== null
                    ? <ToggleEditCard editedIdx={editedAvailabilityIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsAvailability} field="Availability" dataField={'availability'}
                      />
                    : null
                  }

                  {editedVarientIdx !== null
                    ? <ToggleEditCard editedIdx={editedVarientIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsVarient} field="Fragrance Type" dataField={'is_varient'}
                      />
                    : null
                  }

                  {editedVarientOGFragranceIdx !== null
                    ? <NewEditCard editedIdx={editedVarientOGFragranceIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsVarientOGFragrance} field="Varient Original Perfume" dataField={'varient_original_perfume'}
                      />
                    : null
                  }

                  {editedLimitedIdx !== null
                    ? <ToggleEditCard editedIdx={editedLimitedIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsLimited} field="Limited Edition" dataField={'is_limited'}
                      />
                    : null
                  }

                  {editedLimitedOGFragranceIdx !== null
                    ? <NewEditCard editedIdx={editedLimitedOGFragranceIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsLimitedOGFragrance} field="Limited Original Perfume" dataField={'limited_original_perfume'}
                      />
                    : null
                  }

                  {editedCollectorsIdx !== null
                    ? <ToggleEditCard editedIdx={editedCollectorsIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsCollectors} field="Collectors Edition" dataField={'is_collectors'}
                      />
                    : null
                  }

                  {editedCollectorsOGFragranceIdx !== null
                    ? <NewEditCard editedIdx={editedCollectorsOGFragranceIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsCollectorsOGFragrance} field="Collectors Original Perfume" dataField={'collectors_original_perfume'}
                      />
                    : null
                  }

                  {editedPerfumerIdx !== null
                    ? <EditCardMultipleValues editedIdx={editedPerfumerIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsPerfumer} field="Perfumers" dataField={'perfumers'}
                      />
                    : null
                  }

                  {editedPerfumerOtherIdx !== null
                    ? <EditCardMultipleValuesOther editedIdx={editedPerfumerOtherIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsPerfumerOther} field="Custom Perfumers" dataField={'perfumers_other'}
                      />
                    : null
                  }

                  {editedDesignerIdx !== null
                    ? <EditCardMultipleValues editedIdx={editedDesignerIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsDesigner} field="Bottle Designers" dataField={'bottle_designer'}
                      />
                    : null
                  }

                  {editedDesignerOtherIdx !== null
                    ? <EditCardMultipleValuesOther editedIdx={editedDesignerOtherIdx} editedInfo={editedInfo} originalData={originalData} 
                        subEdits={subEditsDesignerOther} field="Custom Bottle Designers" dataField={'bottle_designer_other'}
                      />
                    : null
                  }

                  
                
                  {editedInfo?.length > 0 
                    ? null
                    : 
                      <Card className="p-12 text-center">
                      <Edit3 className="w-16 h-16 text-light-text-secondary/40 dark:text-dark-text-secondary/40 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                        No edits yet
                      </p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Research auditors haven't made any changes to this proposal
                      </p>
                    </Card>
                  }

                 
                </div>
              </div>
    )
}