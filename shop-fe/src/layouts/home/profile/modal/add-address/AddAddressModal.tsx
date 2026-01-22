import { AddressApi, OthersApis } from "@/apis";
import BaseGroupButton from "@/components/common/button/BaseGroupButton";
import BaseSelectRhf from "@/components/common/input-select/BaseSelectRhf";
import { BaseInputRhf } from "@/components/common/input/BaseInputRhf";
import BaseModal from "@/components/common/modal/BaseModal";
import { BaseSwitchRhf } from "@/components/common/switch/BaseSwitchRhf";
import { useSimRhf } from "@/hooks/others/useSimRhf.hook";
import { useToast } from "@/hooks/others/useToast.hook";
import { IAddress } from "@/interfaces/address/address.interface";
import { useEffect, useState } from "react";
import { set, SubmitHandler } from "react-hook-form";

export default function AddAddressModal({
  onClose,
  open,
  total,
}: {
  open: boolean;
  onClose: () => void;
  total: number;
}) {
  const [cityList, setCityList] = useState<any[]>([]);
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [district, setDistrict] = useState<any>(null);
  const [wardsList, setWardsList] = useState<any[]>([]);
  const [wards, setWards] = useState<any>(null);
  const { toastSuccess, toastError, toastWarning } = useToast();
  const { control, handleSubmit, reset, watch } = useSimRhf<IAddress>({
    defaultValues: {
      city: "",
      district: "",
      wards: "",
      street: "",
      isDefault: false,
    },
  });

  useEffect(() => {
    if (open && total) {
      async function initialItem() {
        const res = await OthersApis.getProvinces();
        setCityList(res.data.data);
      }
      initialItem();
    }
  }, [open, total]);

  useEffect(() => {
    if (!district) return;
    async function initialDistricts() {
      const res = await OthersApis.getDistricts(district.value);
      setDistrictList(res.data.data);
    }
    initialDistricts();
  }, [district]);

  useEffect(() => {
    if (!wards) return;
    async function initialWards() {
      const res = await OthersApis.getWards(wards.value);
      setWardsList(res.data.data);
    }
    initialWards();
  }, [wards]);

  const onSubmit: SubmitHandler<IAddress> = async (data) => {
    if (total === 3) {
      toastWarning(
        "Warning",
        "You are not allowed to add more than 3 addresses.",
      );
      return;
    }
    try {
      const res = await AddressApi.create(data);
      if (res.statusCode === 201) {
        toastSuccess("Susscess", res.message);
      }
      onClose();
      reset();
    } catch (error: any) {
      toastError("Error", error.message);
    }
  };

  return (
    <BaseModal
      width="2xl"
      open={open}
      onClose={() => {
        onClose();
        reset();
      }}
      title="Add New Address"
      description="You can update your personal details below. Changes will be saved immediately."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 mb-1">
          <div className="grid grid-cols-3 gap-5">
            <BaseSelectRhf
              required
              options={cityList.map((city) => ({
                label: city.name,
                value: city.code,
              }))}
              control={control}
              onSelectOption={(cityList) => {
                setDistrict(cityList);
              }}
              name="city"
              className="text-[14px]! px-5"
              label="City/Province"
              placeholder="Select city or province"
              classProps={{
                classGroup: "border-none",
                classItem: "text-(--color-text)",
                className:
                  "rounded-[3px] font-normal shadow-none bg-(--color-foreground) border-none",
              }}
            />

            <BaseSelectRhf
              required
              options={
                districtList
                  ? districtList.map((d) => ({
                      label: d.name,
                      value: d.code,
                    }))
                  : []
              }
              control={control}
              onSelectOption={(wards) => {
                setWards(wards);
              }}
              name="district"
              className="text-[14px]! px-5"
              label="District"
              placeholder="Select district"
              classProps={{
                classGroup: "border-none",
                classItem: "text-(--color-text)",
                className:
                  "rounded-[3px] font-normal shadow-none bg-(--color-foreground) border-none",
              }}
            />

            <BaseSelectRhf
              required
              options={
                wardsList
                  ? wardsList.map((wards) => ({
                      label: wards.name,
                      value: wards.code,
                    }))
                  : []
              }
              control={control}
              onSelectOption={() => {}}
              name="wards"
              className="text-[14px]! px-5"
              label="Wards"
              placeholder="Select wards"
              classProps={{
                classGroup: "border-none",
                classItem: "text-(--color-text)",
                className:
                  "rounded-[3px] font-normal shadow-none bg-(--color-foreground) border-none",
              }}
            />
          </div>

          <div className="flex items-end justify-start gap-5">
            <BaseInputRhf
              required
              control={control}
              name="street"
              className="text-[14px]! px-5"
              placeholder="Street Address"
              label="Street Address"
              classProps={{
                inputClass:
                  "focus:border-none! border-none! shadow-none! bg-(--color-foreground) rounded-[3px] ring-(--color-btn)! rounded-[3px]! has-[[data-slot=input-group-control]:focus-visible]:ring-[0.5px]! has-[[data-slot=input-group-control]:focus-visible]:shadow-none! has-[[data-slot=input-group-control]:focus-visible]:border-none!",
                lableClass: "text-sm font-normal",
              }}
            />

            <div className="w-90">
              <BaseSwitchRhf
                control={control}
                name="isDefault"
                label="Set Default Address"
              />
            </div>
          </div>
        </div>
        <BaseGroupButton
          onCancel={() => {
            onClose();
            reset();
          }}
        />
      </form>
    </BaseModal>
  );
}
