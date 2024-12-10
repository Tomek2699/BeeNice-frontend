import { View, Text, SafeAreaView, TouchableOpacity, Image, Animated } from 'react-native'
import React from 'react'
import CustomPageHeader from '@/Components/CustomPageHeader'
import Icons from '@/constants/Icons'
import LoadingScreen from '@/Components/LoadingScreen'
import { useLocalSearchParams } from 'expo-router'
import { useData } from '@/hooks/Reviews/useData'
import { useSearch } from '@/hooks/Reviews/useSearch'
import { useCrud } from '@/hooks/Reviews/useCrud'
import { useScreenActions } from '@/hooks/Reviews/useScreenActions'
import ReviewRenderItem from '@/ScreensComponents/Reviews/ReviewRenderItem'
import EditReviewModal from '@/ScreensComponents/Reviews/EditReviewModal'
import AddReviewModal from '@/ScreensComponents/Reviews/AddReviewModal'

const Review = () => {
  const params = useLocalSearchParams();
  const { hiveId, reviews, filteredReviews, setReviews, setFilteredReviews, isLoading } = useData({ params });
  const { handleSearch } = useSearch({reviews, setFilteredReviews});
  const { handleAddReview, handleEditReview, handleDeleteReview } = useCrud({setReviews});
  const { expandedReview, selectedReview, addReviewModalVisible, editReviewModalVisible, setExpandedReview, 
    openAddReviewModal, closeAddReviewModal, openEditReviewModal, closeEditReviewModal } = useScreenActions({reviews})

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <SafeAreaView className="bg-primaryBg h-full">
      <CustomPageHeader
              title="Przeglądy"
              pageIcon={Icons.review}
              onSearch={handleSearch}
      />
      <View className="self-center mb-4">
        <TouchableOpacity
          className="flex-row justify-center self-center bg-mainButtonBg border-2 rounded-2xl p-4"
          onPress={openAddReviewModal}
        >
          <Text className="font-pbold mr-3">Dodaj przegląd</Text>
          <Image source={Icons.add} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={filteredReviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ReviewRenderItem
            item={item}
            expandedReview={expandedReview}
            setExpandedReview={setExpandedReview}
            handleOnPressEditReview={openEditReviewModal}
            handleDelete={handleDeleteReview}
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
      <AddReviewModal
        visible={addReviewModalVisible}
        hiveId={hiveId}
        onClose={closeAddReviewModal}
        onSave={handleAddReview}
      />
      <EditReviewModal
        visible={editReviewModalVisible}
        value={selectedReview}
        onClose={closeEditReviewModal}
        onSave={handleEditReview}
      />
    </SafeAreaView>
  )
}

export default Review