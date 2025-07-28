'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  before_discount_price: number;
  inventory: number;
  brand: string;
  catalog_url: string;
  images: string[];
  categories: string[];
  specifications: { spec_key: string; spec_label: string; spec_value: string }[];
  product_features: string[];
}

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost/apitak/get_products.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!product) return;
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const res = await fetch('http://localhost/apitak/update_product.php', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    const result = await res.json();
    if (result.success) {
      alert('با موفقیت ویرایش شد!');
      router.push('/products');
    } else {
      alert('خطا در ویرایش: ' + result.error);
    }
  };

  const handleImageChange = (index: number, value: string) => {
    if (!product) return;
    const updated = [...product.images];
    updated[index] = value;
    setProduct({ ...product, images: updated });
  };

  const handleSpecChange = (index: number, field: 'spec_key' | 'spec_label' | 'spec_value', value: string) => {
    if (!product) return;
    const updated = [...product.specifications];
    updated[index][field] = value;
    setProduct({ ...product, specifications: updated });
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!product) return;
    const updated = [...product.product_features];
    updated[index] = value;
    setProduct({ ...product, product_features: updated });
  };

  const addImage = () => {
    if (!product) return;
    setProduct({ ...product, images: [...product.images, ''] });
  };

  const addSpec = () => {
    if (!product) return;
    setProduct({
      ...product,
      specifications: [...product.specifications, { spec_key: '', spec_label: '', spec_value: '' }],
    });
  };

  const removeSpec = (index: number) => {
    if (!product) return;
    const updated = [...product.specifications];
    updated.splice(index, 1);
    setProduct({ ...product, specifications: updated });
  };

  const addFeature = () => {
    if (!product) return;
    setProduct({ ...product, product_features: [...product.product_features, ''] });
  };

  const removeFeature = (index: number) => {
    if (!product) return;
    const updated = [...product.product_features];
    updated.splice(index, 1);
    setProduct({ ...product, product_features: updated });
  };

  if (loading || !product) return <div className="p-10">در حال بارگذاری...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">ویرایش محصول</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="id" value={product.id} />

        {/* Basic fields */}
        <input type="text" name="title" value={product.title} onChange={handleChange} placeholder="عنوان" className="input" />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="قیمت" className="input" />
        <input type="number" name="before_discount_price" value={product.before_discount_price} onChange={handleChange} placeholder="قیمت قبل تخفیف" className="input" />
        <input type="number" name="inventory" value={product.inventory} onChange={handleChange} placeholder="موجودی" className="input" />
        <input type="text" name="brand" value={product.brand} onChange={handleChange} placeholder="برند" className="input" />
        <input type="text" name="catalog_url" value={product.catalog_url} onChange={handleChange} placeholder="لینک کاتالوگ" className="input" />
{/* Categories */}
<div className="space-y-2">
  <label className="block font-medium">دسته‌بندی‌ها</label>
  {product.categories.map((cat, i) => (
    <div key={i} className="flex gap-2 items-center">
      <input
        className="input"
        value={cat}
        onChange={(e) => {
          const updated = [...product.categories];
          updated[i] = e.target.value;
          setProduct({ ...product, categories: updated });
        }}
        placeholder={`دسته‌بندی ${i + 1}`}
      />
      <button
        type="button"
        onClick={() => {
          const updated = [...product.categories];
          updated.splice(i, 1);
          setProduct({ ...product, categories: updated });
        }}
        className="text-red-500"
      >
        X
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => setProduct({ ...product, categories: [...product.categories, ''] })}
    className="btn"
  >
    + افزودن دسته‌بندی
  </button>
</div>

        {/* Images */}
        <div className="space-y-2">
          <label className="block font-medium">تصاویر</label>
          {product.images.map((img, i) => (
            <input key={i} value={img} onChange={(e) => handleImageChange(i, e.target.value)} className="input" placeholder="URL تصویر" />
          ))}
          <button type="button" onClick={addImage} className="btn">+ افزودن تصویر</button>
        </div>

        {/* Specifications */}
        <div className="space-y-2">
          <label className="block font-medium">مشخصات فنی</label>
          {product.specifications.map((spec, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input placeholder="کلید" className="input" value={spec.spec_key} onChange={(e) => handleSpecChange(i, 'spec_key', e.target.value)} />
              <input placeholder="برچسب" className="input" value={spec.spec_label} onChange={(e) => handleSpecChange(i, 'spec_label', e.target.value)} />
              <input placeholder="مقدار" className="input" value={spec.spec_value} onChange={(e) => handleSpecChange(i, 'spec_value', e.target.value)} />
              <button type="button" onClick={() => removeSpec(i)} className="text-red-500">X</button>
            </div>
          ))}
          <button type="button" onClick={addSpec} className="btn">+ افزودن مشخصه</button>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <label className="block font-medium">ویژگی‌ها</label>
          {product.product_features.map((feature, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className="input"
                value={feature}
                onChange={(e) => handleFeatureChange(i, e.target.value)}
                placeholder={`ویژگی ${i + 1}`}
              />
              <button type="button" onClick={() => removeFeature(i)} className="text-red-500">X</button>
            </div>
          ))}
          <button type="button" onClick={addFeature} className="btn">+ افزودن ویژگی</button>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ذخیره تغییرات
        </button>
      </form>

      <style jsx>{`
        .input {
          border: 1px solid #ccc;
          padding: 8px;
          border-radius: 6px;
          width: 100%;
        }
        .btn {
          background-color: #f0f0f0;
          padding: 6px 12px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
